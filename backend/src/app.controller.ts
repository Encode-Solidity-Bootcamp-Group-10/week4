import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('NFT Metadata')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @ApiOperation({
    summary: 'All NFTs metadata',
    description: 'Gets metadata of all the NFTs',
  })
  @ApiResponse({
    status: 200,
    description: 'Database contents',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getAllData() {
    try {
      const result = this.appService.getAll();
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('api/nften/:id')
  @ApiOperation({
    summary: 'NFT Metadata by id',
    description: 'Gets the NFT Metadata by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not configured correctly',
    type: HttpException,
  })
  async getData(@Param('id') id: number) {
    try {
      const result = this.appService.get(id);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
