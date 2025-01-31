import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TransactionDto } from '../dto/transaction.dto';
import Interpreter from 'src/utils/interpreter/interpreter';
import Merchant from '../dto/merchant.dto';
import Pattern from '../dto/pattern.dto';
import UploadResponse from 'src/dto/upload_response.dto';

dotenv.config();

@Injectable()
export class AnalyzeService {
  constructor(private readonly interpreter: Interpreter) {}

  async transactionToMerchant(request: TransactionDto): Promise<Merchant> {
    return await this.interpreter.normalize<TransactionDto, Merchant>(
      request,
      'merchant',
    );
  }
  async transactionsToPatterns(request: TransactionDto[]): Promise<Pattern[]> {
    return await this.interpreter.normalize<TransactionDto[], Pattern[]>(
      request,
      'patterns',
    );
  }
  async transactionsToResponse(
    request: TransactionDto[],
  ): Promise<UploadResponse> {
    return await this.interpreter.normalize<TransactionDto[], UploadResponse>(
      request,
      'normalize',
    );
  }
}
