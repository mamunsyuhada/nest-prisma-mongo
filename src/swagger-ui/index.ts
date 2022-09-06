import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Codebase with Prisma - MongoDB')
  .setDescription('Just trying to make a better codebase')
  .setVersion('1.0')
  .build();

// adding custom options
export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: { persistAuthorization: true },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Nest Prisma MongoDB',
  customfavIcon: 'https://www.prisma.io/images/favicon-32x32.png',
};
