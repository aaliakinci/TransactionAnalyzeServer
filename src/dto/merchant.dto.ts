import { ApiProperty } from '@nestjs/swagger';

export default class Merchant {
  @ApiProperty({
    example: 'Netflix',
    description: 'Merchant name',
  })
  merchant: string;

  @ApiProperty({
    example: 'Entertainment',
    description: 'General category of the merchant',
  })
  category: string;

  @ApiProperty({
    example: 'Streaming Service',
    description: 'Sub-category of the merchant',
  })
  sub_category: string;

  @ApiProperty({
    example: 0.98,
    description: 'Confidence score (0.0 - 1.0) for the merchant classification',
  })
  confidence: number;

  @ApiProperty({
    example: true,
    description: 'Indicates if the transaction is a subscription',
  })
  is_subscription: boolean;

  @ApiProperty({
    example: ['subscription', 'digital_service'],
    description:
      'Additional flags providing extra metadata about the transaction',
  })
  flags: string[];
}
