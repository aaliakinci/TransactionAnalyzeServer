import { ApiProperty } from '@nestjs/swagger';

export default class Pattern {
  @ApiProperty({
    example: 'subscription',
    description: 'Type of the transaction pattern (e.g., subscription, recurring)',
    enum: ['subscription', 'recurring'], // Swagger için olası değerleri belirtiyoruz
  })
  type: string;

  @ApiProperty({
    example: 'Netflix',
    description: 'Merchant name associated with the pattern',
  })
  merchant: string;

  @ApiProperty({
    example: 19.99,
    description: 'Transaction amount related to the pattern',
  })
  amount: number;

  @ApiProperty({
    example: 'monthly',
    description: 'Frequency of the pattern (e.g., daily, weekly, monthly, yearly)',
    enum: ['daily', 'weekly', 'monthly', 'yearly'], // Olası değerleri belirttik
  })
  frequency: string;

  @ApiProperty({
    example: 0.98,
    description: 'Confidence score (0.0 - 1.0) indicating prediction reliability',
  })
  confidence: number;

  @ApiProperty({
    example: '2024-02-15',
    description: 'Next expected occurrence of this transaction (ISO 8601 date format)',
    required: false, // Opsiyonel olduğu için Swagger'da required olmadığını belirttik
  })
  next_expected?: string;
}