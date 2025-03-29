import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Latitude of the location' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the location' })
  @IsNumber()
  longitude: number;
}
