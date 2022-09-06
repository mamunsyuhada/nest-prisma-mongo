import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async createUser(body: RegisterUserRequestDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    return await this.prisma.user.create({
      data: body,
    });
  }
}
