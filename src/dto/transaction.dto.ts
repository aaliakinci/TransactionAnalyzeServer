import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString} from 'class-validator';

export class TransactionDto {
  @ApiProperty({ example: "2024-01-15", description: "Transaction date (YYYY-MM-DD)" })
  @IsDateString()
  date: string;

  @ApiProperty({ example: "Netflix Subscription", description: "Transaction description" })
  @IsString()
  description: string;

  @ApiProperty({ example: 19.99, description: "Transaction amount" })
  @IsInt()
  amount: number;
}