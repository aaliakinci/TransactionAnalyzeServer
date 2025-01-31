import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // Frontend URL (Update this)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  });

  const config = new DocumentBuilder()
    .setTitle('Transaction Analyzer')
    .setDescription('The Transaction Analyze API description')
    .setVersion('1.0')
    .addTag('transaction_analyze')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
