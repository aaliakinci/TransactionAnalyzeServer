import { Module } from '@nestjs/common'; 
import Parser from './parser';

@Module({
  providers: [Parser],
  exports: [Parser],
})
export class ParserModule {}
