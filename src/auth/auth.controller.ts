import { Body, Controller, Post } from '@nestjs/common';
import {
  RequestRegisterUserDto,
  ResponseRegisterUserDto,
  ResponseRegisterUserSuccess,
} from './dto/register-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RequestAuthLoginDto,
  ResponseAuthLoginDto,
  ResponseAuthLoginSuccess,
} from './dto/auth-login.dto';

@Controller('user')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse(ResponseRegisterUserSuccess)
  async register(
    @Body() body: RequestRegisterUserDto,
  ): Promise<ResponseRegisterUserDto> {
    return this.authService.createUser(body);
  }

  @Post('login')
  @ApiCreatedResponse(ResponseAuthLoginSuccess)
  async login(
    @Body() body: RequestAuthLoginDto,
  ): Promise<ResponseAuthLoginDto> {
    return this.authService.login(body);
  }
}
