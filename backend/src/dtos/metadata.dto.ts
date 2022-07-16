import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    required: true,
    description: 'Name of this NFT',
    examples: ['FooNFT', 'BarNFT', 'NFT10'],
  })
  name: string;
  @ApiProperty({
    required: false,
    description: 'Description for this NFT',
  })
  description?: string;
  @ApiProperty({
    required: false,
    description: 'CID of the IPFS\'s hosted NFT image',
    example: 'QmTxoXQmM31u5WPDgvYvJcsQe5HKLVD59xZd3BdkX4LiE4',
  })
  cid?: string;
  @ApiProperty({
    required: false,
    description: 'Given type for this object',
    example: ['Tasty', 'Sweet', 'Mint'],
  })
  attributes?: string[];
}
