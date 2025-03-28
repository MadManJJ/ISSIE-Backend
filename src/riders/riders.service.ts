import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { DatabaseService } from '../database/database.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class RidersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createRider(createRiderDto: CreateRiderDto) {

    if (!createRiderDto) {
      throw new BadRequestException('Invalid data: Rider data is required'); // Throws a 400
    }

    const createdRider = await this.databaseService.rider.create({ data: createRiderDto });
    return { message: 'Rider created successfully', rider: createdRider };
  }

  async findAllRiders() {
    const riders = await this.databaseService.rider.findMany({});
    if (riders.length === 0) {
      throw new NotFoundException('No riders found');
    }

    return { message: 'Riders fetched successfully', riders };
  }

  async findRiderById(id: number) {
    const rider = await this.databaseService.rider.findUnique({ where : { id: id }});

    if(!rider){
      throw new NotFoundException(`Rider with ID ${id} not found`); // Throws a 404
    }
    
    return { message: `Rider with ID ${id} found successfully`, rider };
  }

  async updateRider(id: number, updateRiderDto: UpdateRiderDto) {
    try {
      const updatedRider = await this.databaseService.rider.update({
        where: { id },
        data: updateRiderDto,
      });
      return { message: 'Rider updated successfully', rider: updatedRider };
    } catch (error) {
      throw new NotFoundException(`Rider with ID ${id} not found`);
    }
  }

  async removeRider(id: number) {
    try {
      const removedRider = await this.databaseService.rider.delete({
        where: { id }
      });

      return { message: 'Rider deleted successfully' , rider: removedRider};
    } catch (error) {
      throw new NotFoundException(`Rider with ID ${id} not found`);
    }
  }

  async findLocationByRiderId(riderId: number){
    const location = await this.databaseService.location.findUnique({
      where: { riderId }
    });
  
    if (!location) {
      throw new NotFoundException(`Location for Rider ID ${riderId} not found`);
    }
  
    return { message: `Location found for Rider ID ${riderId}`, location };
  }

  async createLocation(id: number, createLocationDto: CreateLocationDto){
    try {
      const createdLocation = await this.databaseService.location.create({
        data: {
          ...createLocationDto,
          rider: { connect: { id } }
        }
      });

      return { message: `Location created successfully for Rider ID ${id}`, location: createdLocation };
    } catch (error) {
      throw new BadRequestException(`Failed to create location for Rider ID ${id}`); // Throw a 400
    }
  }

  async findNearbyRiders(latitude: number, longitude: number){
    const SEARCH_RADIUS_KM = 5;

    const riders = await this.databaseService.rider.findMany({
      where: { location: { isNot: null } }, // Ensures only riders with locations are fetched
      include: { location: true },
    });

    if (riders.length == 0) {
      throw new NotFoundException('No riders found with locations.');
    }

    const nearbyRiders = riders.filter(rider => {
      if (rider.location) {
        const distance = this.haversine(latitude, longitude, rider.location.latitude, rider.location.longitude);
        console.log(`Distance from (${latitude}, ${longitude}) to (${rider.location.latitude}, ${rider.location.longitude}) is: ${distance} km`);
        return distance <= SEARCH_RADIUS_KM;
      }
      return false;
    });
  
    return { message: `${nearbyRiders.length} riders found within 5 km`, riders: nearbyRiders };
  }

    // Haversine formula to calculate the distance between two geo-coordinates (in km)
    private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const R = 6371; // Earth's radius in kilometers
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
  
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
    }
  
    // Helper to convert degrees to radians
    private deg2rad(deg: number): number {
      return deg * (Math.PI / 180);
    }
}
