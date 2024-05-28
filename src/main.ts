import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000000,
      maxFiles: 5,
    }),
  );
  await app.listen(3000);
}
bootstrap();
