import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTOs
  }));

    // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('Rider API')  // API title
    .setDescription('The Rider API description')  // API description
    .setVersion('1.0')  // API version
    .addTag('riders')  // Tags to categorize the endpoints
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);  // Swagger UI will be available at '/api'

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
