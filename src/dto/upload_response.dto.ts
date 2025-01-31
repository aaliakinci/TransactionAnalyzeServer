import { ApiProperty } from '@nestjs/swagger';

import NormalizedTransactions from './normalized_transaction.dto';
import Pattern from 'src/dto/pattern.dto';

export default class UploadResponse  {
  @ApiProperty({
    type: [NormalizedTransactions],
    description: 'List of normalized transactions',
  })
  normalized_transactions: NormalizedTransactions[];

  @ApiProperty({
    type: [Pattern],
    description: 'List of detected transaction patterns',
  })
  detected_patterns: Pattern[];
}
