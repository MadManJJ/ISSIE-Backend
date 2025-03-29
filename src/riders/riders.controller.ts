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
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to create rider due to server issues.' })
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.ridersService.createRider(createRiderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all riders' })
  @ApiResponse({ status: 200, description: 'Returns a list of all riders.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to retrieve riders.' })
  findAll() {
    return this.ridersService.findAllRiders();
  }

  @Get('search')
  @ApiOperation({ summary: 'Get all riders in the 5 km' })
  @ApiResponse({ status: 200, description: 'Returns riders within a 5km radius.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid latitude or longitude provided.' })
  @ApiResponse({ status: 404, description: 'No nearby riders found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to process location search.' })
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
  @ApiResponse({ status: 200, description: 'Returns the rider details.' })
  @ApiResponse({ status: 404, description: 'Rider not found with the provided ID.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to retrieve rider.' })
  findOne(@Param('id') id: string) {
    return this.ridersService.findRiderById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rider' })
  @ApiResponse({ status: 200, description: 'Returns updated rider details.' })
  @ApiResponse({ status: 404, description: 'Rider not found with the provided ID.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred while updating the rider.' })
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.ridersService.updateRider(+id, updateRiderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rider' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the rider.' })
  @ApiResponse({ status: 404, description: 'Rider not found with the provided ID.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to delete rider.' })
  remove(@Param('id') id: string) {
    return this.ridersService.removeRider(+id);
  }

  @Post(':riderId/locations')
  @ApiOperation({ summary: 'Create location for that rider' })
  @ApiResponse({ status: 201, description: 'Successfully created location for the rider.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid Rider ID or location data.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to create location.' })
  createLocation(@Param('riderId') riderId: string , @Body() createLocationDto: CreateLocationDto) {
    return this.ridersService.createLocation(+riderId,createLocationDto);
  }

  @Get(':riderId/locations')
  @ApiOperation({ summary: 'Get location of that rider' })
  @ApiResponse({ status: 200, description: 'Returns the rider\'s location details.' })
  @ApiResponse({ status: 404, description: 'No location found for the specified rider.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Unable to retrieve location.' })
  findLocation(@Param('riderId') riderId: string){
    return this.ridersService.findLocationByRiderId(+riderId);
  }
}
