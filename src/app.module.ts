import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { ProviderType } from './utils/interpreter/enums/provider.type.enum';
import Interpreter from './utils/interpreter/interpreter';
import Parser from './utils/parser/parser';
import { AnalyzeService } from './analyze/analyze.service';
import { AnalyzeController } from './analyze/analyze.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AnalyzeModule } from './analyze/analyze.module';
import { ParserModule } from './utils/parser/parser.module';
import { InterpreterModule } from './utils/interpreter/interpreter.module';
import { InterceptorModule } from './interceptors/interceptor.module';
import { UplaodModule } from './upload/upload.module';

@Module({
  imports: [
    InterpreterModule,
    ParserModule,
    AnalyzeModule,
    InterceptorModule,
    UplaodModule,
  ],
})
export class AppModule {}
