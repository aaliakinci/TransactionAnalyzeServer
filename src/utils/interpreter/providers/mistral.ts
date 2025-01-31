import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Mistral } from '@mistralai/mistralai';
 
dotenv.config();

@Injectable()
export class MistralAI {
  private mistral: Mistral;
  private readonly maxRetries: number = 10; // 🔄 Kaç kez deneyeceğini belirle
  
  constructor() {
    const mistral = new Mistral({
      apiKey: process.env['MISTRAL_API_KEY'] ?? '',
    });
    this.mistral = mistral;
  }

  async normalize<T, R>(transactions: T): Promise<R> {
    let attempts = 0;

    while (attempts < this.maxRetries) {
      try {
        console.log(`📢 Mistral AI çağrısı yapılıyor. Deneme: ${attempts + 1}`);

        const response = await this.mistral.chat.complete({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: 'You are a financial transaction normalizer.',
            },
            { role: 'user', content: JSON.stringify(transactions) },
          ],
        });

        if (!response || !response.choices || response.choices.length === 0) {
          throw new HttpException('Mistral yanıtı boş geldi.', HttpStatus.NO_CONTENT);
        }
        console.log("response.choices[0].message.content.toString().trim()",response.choices[0].message.content.toString().trim())
        const content = response.choices[0].message.content.toString().trim();

        // JSON bloklarını temizle (```json ... ```)
        const jsonMatch = content.match(/```json([\s\S]*?)```/);
        const jsonString = jsonMatch ? jsonMatch[1].trim() : content;

        console.log('📩 Mistral Yanıtı:', jsonString);

        // JSON parse etmeyi dene
        try {
          return JSON.parse(jsonString) as R;
        } catch (error) {
          throw new HttpException(`Geçersiz JSON yanıtı alındı: ${jsonString}`, HttpStatus.UNPROCESSABLE_ENTITY);
        }

      } catch (error) {
        console.error(`⚠️ Hata oluştu: ${error.message}`);

        if (error.message.includes('fetch') || error.message.includes('timeout')) {
          attempts++;
          if (attempts >= this.maxRetries) {
            throw new HttpException(
              `Mistral AI isteği ${this.maxRetries} kez denendi ve başarısız oldu.`,
              HttpStatus.REQUEST_TIMEOUT,
            );
          }

          console.log(`⏳ ${attempts} saniye bekleniyor ve tekrar deneniyor...`);
          await new Promise((resolve) => setTimeout(resolve, attempts * 1000));
        } else {
          throw new HttpException(
            `Failed to normalize transactions: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    throw new HttpException('Mistral AI isteği başarısız oldu.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
