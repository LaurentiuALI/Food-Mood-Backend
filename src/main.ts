import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: (errors) => {
    const errorMessages = {};
    errors.forEach(error => {
      errorMessages[error.property] = Object.values(error.constraints).join('. ').trim()
    })
    return new BadRequestException({
      error: "Bad Request",
      message: errorMessages,
      statusCode: 400,
    });
  }}));
  
  const config = new DocumentBuilder()
  .setTitle('Foodmood API')
  .setDescription('Foodmood API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
