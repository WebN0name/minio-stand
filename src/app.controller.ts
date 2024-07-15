import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
@ApiTags('upload-files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        bucket: {
          type: 'string',
        },
      },
    },
  })
  uploadFile(
    @UploadedFile() file,
    @Body() data
  ) {
    return this.appService.uploadFile(file, data);
  }
}
