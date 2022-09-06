import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserRequestDto {
  // Validates for a non-empty string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  // Gets only validated if it's part of the request's body
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public email: string;
}
