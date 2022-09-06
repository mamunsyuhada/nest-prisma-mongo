import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RequestAuthLoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'password is too short' })
  password: string;
}

export class ResponseAuthLoginDto {
  @ApiProperty()
  userAccessToken: string;

  // @ApiProperty()
  // refreshToken: string;
}

class SuccessResponse {
  @ApiProperty()
  data: ResponseAuthLoginDto;

  @ApiProperty()
  statusCode: number;
}

export const ResponseAuthLoginSuccess: ApiResponseOptions = {
  description: 'Register User',
  type: SuccessResponse,
};
