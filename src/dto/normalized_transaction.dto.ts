import Merchant from 'src/dto/merchant.dto'; 
import { ApiProperty } from '@nestjs/swagger';

export default class NormalizedTransactions {
  @ApiProperty({
    example: 'NFLX DIGITAL NTFLX US',
    description: 'Original transaction string before normalization',
  })
  original: string;

  @ApiProperty({
    type: Merchant,
    description: 'Normalized merchant details',
  })
  normalized: Merchant;
}