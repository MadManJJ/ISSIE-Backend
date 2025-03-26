import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('riders')
@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rider' })
  @ApiResponse({ status: 201, description: 'The rider has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request: The provided data is invalid. Possible reasons: missing required fields, incorrect data types, or invalid JSON format.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred during the creation of the rider.' })
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.ridersService.createRider(createRiderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all riders' })
  @ApiResponse({ status: 200, description: 'List of all riders' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred during the creation of the rider.' })
  findAll() {
    return this.ridersService.findAllRiders();
  }

  @Get('search')
  @ApiOperation({ summary: 'Get all riders in the 5 km' })
  @ApiResponse({ status: 200, description: 'Get all riders in 5 km' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid latitude or longitude provided.' })
  @ApiResponse({ status: 404, description: 'Rider not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while fetching the riders in the 5 km radius.' })
  findNearbyRiders(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string
  ){
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    return this.ridersService.findNearbyRiders(lat, lon);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rider by id' })
  @ApiResponse({ status: 200, description: 'Rider details' })
  @ApiResponse({ status: 404, description: 'Rider not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while fetching the rider.' })
  findOne(@Param('id') id: string) {
    return this.ridersService.findRiderById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rider' })
  @ApiResponse({ status: 200, description: 'Rider details' })
  @ApiResponse({ status: 404, description: 'Rider not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while updating the rider.' })
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.ridersService.updateRider(+id, updateRiderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rider' })
  @ApiResponse({ status: 200, description: 'Rider details' })
  @ApiResponse({ status: 404, description: 'Rider not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while deleting the rider.' })
  remove(@Param('id') id: string) {
    return this.ridersService.removeRider(+id);
  }

  @Post(':riderId/locations')
  @ApiOperation({ summary: 'Create location for that rider' })
  @ApiResponse({ status: 200, description: 'Location details' })
  @ApiResponse({ status: 400, description: 'Bad Request: Possible reasons include: invalid Rider ID, invalid location data, or a database error.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while creating the location for the rider.' })
  createLocation(@Param('riderId') riderId: string , @Body() createLocationDto: CreateLocationDto) {
    return this.ridersService.createLocation(+riderId,createLocationDto);
  }

  @Get(':riderId/locations')
  @ApiOperation({ summary: 'Get location of that rider' })
  @ApiResponse({ status: 200, description: 'Location details' })
  @ApiResponse({ status: 404, description: 'Location not found for that rider' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while fetching the location of the rider.' })
  findLocation(@Param('riderId') riderId: string){
    return this.ridersService.findLocationByRiderId(+riderId);
  }
}
