import { Module } from '@nestjs/common';
import Merchant from './merchant.dto';
import NormalizedTransactions from './normalized_transaction.dto';
import Pattern from './pattern.dto';
import { TransactionDto } from './transaction.dto';
import UploadResponse from './upload_response.dto';

@Module({
  providers: [
    Merchant,
    NormalizedTransactions,
    Pattern,
    TransactionDto,
    UploadResponse,
  ], 

  exports: [
    Merchant,
    NormalizedTransactions,
    Pattern,
    TransactionDto,
    UploadResponse,
  ],
})
export class DtoModule {}
