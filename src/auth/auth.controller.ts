import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterUserRequestDto,
  RegisterUserSuccessResponse,
} from './dto/register-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('user')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse(RegisterUserSuccessResponse)
  async registerUser(@Body() body: RegisterUserRequestDto) {
    return this.authService.createUser(body);
  }
}
