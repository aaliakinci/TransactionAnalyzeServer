import { Module } from '@nestjs/common';
import { ProviderType } from './enums/provider.type.enum';
import Interpreter from './interpreter';

@Module({
  providers: [
    {
      provide: 'PROVIDER_TYPE',
      useValue: ProviderType.Mistral, // Varsayılan provider OpenAI olarak ayarlandı
    },
    Interpreter,
  ],
  exports: [Interpreter],
})
export class InterpreterModule {}
