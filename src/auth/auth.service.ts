import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RegisterUserRequestDto,
  RegisterUserResponseDto,
} from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService) {}
  async createUser(
    body: RegisterUserRequestDto,
  ): Promise<RegisterUserResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    try {
      body.password = await bcrypt.hash(body.password, await bcrypt.genSalt());
      const newUser = await this.prisma.user.create({ data: body });
      delete newUser.password;
      return newUser;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
