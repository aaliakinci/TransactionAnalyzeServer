import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { TransactionDto } from '../dto/transaction.dto';
import Merchant from '../dto/merchant.dto';
import Pattern from '../dto/pattern.dto';
import { AnalyzeService } from './analyze.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Analyze')
@Controller('api/analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Post('/merchant')
  @ApiBody({
    type: TransactionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'normalize to merchant',
    type: Merchant,
    isArray: false,
  })
  async merchant(@Body() transaction: TransactionDto): Promise<Merchant> {
    return await this.analyzeService.transactionToMerchant(transaction);
  }

  @Post('/patterns')
  @ApiBody({
    isArray: true,
    type: TransactionDto,
  })
  @ApiResponse({
    status: 200,
    description: 'normalize to patterns',
    type: Pattern,
    isArray: true,
  })
  async patterns(@Body() transaction: TransactionDto[]): Promise<Pattern[]> {
    return await this.analyzeService.transactionsToPatterns(transaction);
  }
}
