import { Module } from '@nestjs/common';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';
import { InterpreterModule } from 'src/utils/interpreter/interpreter.module';
import Merchant from '../dto/merchant.dto';
import Pattern from '../dto/pattern.dto';
import { TransactionDto } from '../dto/transaction.dto';
import UploadResponse from 'src/dto/upload_response.dto';
import { DtoModule } from 'src/dto/dto.module';

@Module({
  imports: [InterpreterModule, DtoModule], // InterpreterModule'ü ekledik
  controllers: [AnalyzeController],
  providers: [AnalyzeService],
  exports: [AnalyzeService],
})
export class AnalyzeModule {}
