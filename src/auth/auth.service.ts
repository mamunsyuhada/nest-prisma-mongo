import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RequestRegisterUserDto,
  ResponseRegisterUserDto,
} from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { RequestAuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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

  async login(body: RequestAuthLoginDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email, deleted: false },
    });
    if (!user) {
      throw new NotAcceptableException('Unknown user');
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid credential/password');
    }
    try {
      const payload: JWTPayload = { email: user.email };
      return { userAccessToken: this.jwtService.sign(payload) };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
