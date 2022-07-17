import { ApiProperty } from '@nestjs/swagger';

class AttributesDto {
  trait_type: string;
  value: string;
}

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
    description: "CID of the IPFS's hosted NFT image",
    example: 'QmTxoXQmM31u5WPDgvYvJcsQe5HKLVD59xZd3BdkX4LiE4',
  })
  cid?: string;
  @ApiProperty({
    required: false,
    description: 'Given attributes for this NFT',
    example: [
      { trait_type: 'flavor1', value: 'Chocolate0' },
      { trait_type: 'flavor2', value: 'Mint0' },
    ],
  })
  attributes?: AttributesDto[];
}
