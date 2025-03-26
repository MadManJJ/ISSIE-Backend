import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RidersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRiderDto: Prisma.RiderCreateInput) {
    return this.databaseService.rider.create({ data: createRiderDto });
  }

  async findAll() {
    return this.databaseService.rider.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.rider.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateRiderDto: Prisma.RiderUpdateInput) {
    return this.databaseService.rider.update({
      where: {
        id
      },
      data: updateRiderDto
    });
  }

  async remove(id: number) {
    return this.databaseService.rider.delete({
      where: { id }
    })
  }
}
