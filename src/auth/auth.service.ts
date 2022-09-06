import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RequestRegisterUserDto,
  ResponseRegisterUserDto,
} from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService) {}
  async createUser(
    body: RequestRegisterUserDto,
  ): Promise<ResponseRegisterUserDto> {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email, deleted: false },
    });
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    try {
      body.userId = uuid();
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
