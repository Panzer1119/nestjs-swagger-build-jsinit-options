import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: (a, b) => {
        const isADefault: boolean = a === 'default';
        const isBDefault: boolean = b === 'default';
        if (isADefault || isBDefault) {
          if (isADefault && isBDefault) {
            return 0;
          }
          return isADefault ? -1 : 1;
        }
        return a.localeCompare(b);
      },
      operationsSorter: (a, b) => a.get('id').localeCompare(b.get('id')),
    },
  });

  await app.listen(3000, '127.0.0.1', async () => {
    const appUrl: string = await app.getUrl();
    console.log(`Visit the Swagger API Documentation here: ${appUrl}/api`);
  });
}

bootstrap();
