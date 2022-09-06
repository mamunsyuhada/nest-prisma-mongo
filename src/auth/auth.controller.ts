import { Body, Controller, Post } from '@nestjs/common';
import {
  RequestRegisterUserDto,
  ResponseRegisterUserSuccess,
} from './dto/register-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('user')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse(ResponseRegisterUserSuccess)
  async registerUser(@Body() body: RequestRegisterUserDto) {
    return this.authService.createUser(body);
  }
}
