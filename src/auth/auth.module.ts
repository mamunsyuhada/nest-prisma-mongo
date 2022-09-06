import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GlobalConfig } from 'src/helper/config/global.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      secret: GlobalConfig.jwt.secret,
      signOptions: { expiresIn: GlobalConfig.jwt.expiresIn },
    }),
  ],
})
export class AuthModule {}
