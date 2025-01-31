import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyzeService } from 'src/analyze/analyze.service';
import Parser from 'src/utils/parser/parser';
import UploadResponse from '../dto/upload_response.dto';
import { TransactionDto } from 'src/dto/transaction.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Upload')
@Controller('api')
export class UploadController {
  constructor(
    private readonly parser: Parser,
    private readonly analyzeService: AnalyzeService,
  ) {
    const uploadDir = path.join(__dirname, '../../../uploads'); // Kök dizine kaydedilecek
    // Eğer 'uploads/' klasörü yoksa, oluştur
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload and process a CSV file' })
  @ApiBody({
    description: 'Upload a CSV file containing transaction data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Normalized transactions and detected patterns',
    type: UploadResponse,
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const transactions = await this.parser.parseCsv<TransactionDto>(file.path);
    const result =
      await this.analyzeService.transactionsToResponse(transactions);
    return result;
  }
}
