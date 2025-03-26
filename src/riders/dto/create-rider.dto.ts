// src/riders/dto/create-rider.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRiderDto {
  @ApiProperty({ description: 'The first name of the rider' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the rider' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The email of the rider' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'The license plate of the rider' })
  @IsString()
  licensePlate: string;

  @ApiProperty({ description: 'The phone number of the rider' })
  @IsString()
  phoneNumber: string;
}
