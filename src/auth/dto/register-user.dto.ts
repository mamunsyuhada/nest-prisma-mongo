import { ApiProperty, ApiResponseOptions, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class RequestRegisterUserDto {
  @IsUUID()
  @IsOptional()
  userId: string;
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

export class ResponseRegisterUserDto extends PickType(RequestRegisterUserDto, [
  'email',
  'name',
]) {}

class SuccessResponse {
  @ApiProperty()
  data: ResponseRegisterUserDto;

  @ApiProperty()
  statusCode: number;
}

export const ResponseRegisterUserSuccess: ApiResponseOptions = {
  description: 'Register User',
  type: SuccessResponse,
};
