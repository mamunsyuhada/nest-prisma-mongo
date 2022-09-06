import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserRequestDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService) {}
  async createUser(body: RegisterUserRequestDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });
    try {
      if (user) {
        throw new BadRequestException('Email already registered');
      }
      return await this.prisma.user.create({
        data: body,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
