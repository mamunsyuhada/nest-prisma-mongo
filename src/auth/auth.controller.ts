import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserRequestDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('user')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() body: RegisterUserRequestDto,
  ): Promise<RegisterUserRequestDto> {
    return this.authService.createUser(body);
  }
}
