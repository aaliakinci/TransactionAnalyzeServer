import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload/upload.controller';
import { OpenAIService } from './utils/interpreter/interpreter.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [OpenAIService],
    }).compile();
  });

  // describe('uploadJson', () => {
  //   it('should return "Hello World!"', () => {
  //     const appController = app.get(UploadController);
  //     expect(appController.uploadJson()).toBe('Hello World!');
  //   });
  // });
});
