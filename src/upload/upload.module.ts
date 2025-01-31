import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ParserModule } from 'src/utils/parser/parser.module';
import { AnalyzeModule } from 'src/analyze/analyze.module';
  
import { DtoModule } from 'src/dto/dto.module';

@Module({
  imports: [ParserModule, AnalyzeModule, DtoModule],
  controllers: [UploadController]
})
export class UplaodModule {}
