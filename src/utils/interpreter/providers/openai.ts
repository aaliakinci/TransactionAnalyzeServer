import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { OpenAI as OpenAIApi } from 'openai';
import Merchant from 'src/dto/merchant.dto';
import Pattern from 'src/dto/pattern.dto';
import UploadResponse from 'src/dto/upload_response.dto';
dotenv.config();

@Injectable()
export class OpenAI {
  private openai: OpenAIApi;
  constructor() {
    const configuration = {
      apiKey: process.env.OPENAI_API_KEY,
    };

    this.openai = new OpenAIApi(configuration);
  }
  async normalize<R>(prompt: string): Promise<R> {
    try {
      console.log('prompt', prompt);
      const response = await this.openai.chat.completions
        .create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a financial transaction normalizer.',
            },
            { role: 'user', content: prompt },
          ],
        })
        .withResponse();

      if (!response.data || !response.data.choices.length) {
        throw new Error('OpenAI response is empty.');
      }

      return JSON.parse(response.data.choices[0].message?.content || '{}');
    } catch (error) {
      console.error('Error in normalize method:', error);
      throw new Error(`Failed to normalize transactions: ${error.message}`);
    }
  }
}
