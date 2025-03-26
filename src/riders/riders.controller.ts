import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { CreateLocationDto } from './dto/create-location.dto';


@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post()
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.ridersService.createRider(createRiderDto);
  }

  @Get()
  findAll() {
    return this.ridersService.findAllRiders();
  }

  @Get('search')
  findNearbyRiders(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string
  ){
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    return this.ridersService.findNearbyRiders(lat, lon);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridersService.findRiderById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.ridersService.updateRider(+id, updateRiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridersService.removeRider(+id);
  }

  @Post(':riderId/locations')
  createLocation(@Param('riderId') riderId: string , @Body() createLocationDto: CreateLocationDto) {
    return this.ridersService.createLocation(+riderId,createLocationDto);
  }

  @Get(':riderId/locations')
  findLocation(@Param('riderId') riderId: string){
    return this.ridersService.findLocationByRiderId(+riderId);
  }
}
