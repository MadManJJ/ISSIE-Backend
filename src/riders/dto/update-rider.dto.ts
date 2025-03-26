import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateRiderDto {
  @ApiProperty({ description: 'The updated first name' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'The updated last name' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'The updated email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The updated license plate' })
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @ApiProperty({ description: 'The updated phone number' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;
}
