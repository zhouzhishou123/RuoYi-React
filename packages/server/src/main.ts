import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || '28534E8F',
      resave: false,
      rolling: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 60 * 1000, // 验证码的过期时间
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // https 下需要设置
      },
    }) as any,
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX || 'api');

  const config = new DocumentBuilder()
    .setTitle('admin management')
    .setDescription('Api 文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
