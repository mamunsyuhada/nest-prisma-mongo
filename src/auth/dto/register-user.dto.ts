import { ApiProperty, ApiResponseOptions, PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class RegisterUserRequestDto {
  // Validates for a non-empty string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  // Gets only validated if it's part of the request's body
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterUserResponseDto extends PickType(RegisterUserRequestDto, [
  'email',
  'name',
]) {}

class SuccessResponse {
  constructor(data: any) {
    this.data = data;
  }
  @ApiProperty()
  data: RegisterUserResponseDto;

  @ApiProperty()
  statusCode: number;
}

export const RegisterUserSuccessResponse: ApiResponseOptions = {
  description: 'Register User',
  type: SuccessResponse,
};
