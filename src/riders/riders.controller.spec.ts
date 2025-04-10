import { Test, TestingModule } from '@nestjs/testing';
import { RidersController } from './riders.controller';
import { RidersService } from './riders.service';
import { Prisma } from '@prisma/client';

describe('RidersController', () => {
  let controller: RidersController;
  let service: RidersService;

  const mockRidersService = {
    createRider: jest.fn(),
    findAllRiders: jest.fn(),
    findRiderById: jest.fn(),
    updateRider: jest.fn(),
    removeRider: jest.fn(),
    createLocation: jest.fn(),
    findLocationByRiderId: jest.fn(),
    findNearbyRiders: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidersController],
      providers: [
        {
          provide: RidersService,
          useValue: mockRidersService,
        },
      ],
    }).compile();

    controller = module.get<RidersController>(RidersController);
    service = module.get<RidersService>(RidersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRider', () => { 
    it('should successfully create a rider', async () => {
      const createRiderDto: Prisma.RiderCreateInput = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        licensePlate: 'ABC123',
        phoneNumber: '647-391-5988'
      };

      mockRidersService.createRider.mockResolvedValue(createRiderDto);

      const result = await controller.create(createRiderDto);
      expect(result).toEqual(createRiderDto); // check if create from controller call createRider from service
      expect(mockRidersService.createRider).toHaveBeenCalledWith(createRiderDto); // check if we call createRider in service with createRiderDto
    })

  });

  describe('findAll', () => {
    it('should return an array of riders', async () => {
      const mockRiders = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ];
  
      mockRidersService.findAllRiders.mockResolvedValue(mockRiders);
  
      const result = await controller.findAll();
      expect(result).toEqual(mockRiders); // check if findAll from controller call findAllRiders from service
      expect(mockRidersService.findAllRiders).toHaveBeenCalled(); // check if we call findAllRiders in service
    });
  });

  describe('findOne', () => {
    it('should return a rider by ID', async () => {
      const mockRider = { id: 1, firstName: 'John', lastName: 'Doe' };
  
      mockRidersService.findRiderById.mockResolvedValue(mockRider);
  
      const result = await controller.findOne('1');
      expect(result).toEqual(mockRider); // check if findOne from controller call findRiderById from service
      expect(mockRidersService.findRiderById).toHaveBeenCalledWith(1); // check if we actually call findRiderById in RidersService with 1 not '1'
    });
  });

  describe('update', () => {
    it('should update a rider', async () => {
      const updateRiderDto = { firstName: 'Updated Name' };
      const updatedRider = { id: 1, firstName: 'Updated Name', lastName: 'Doe' };
  
      mockRidersService.updateRider.mockResolvedValue(updatedRider);
  
      const result = await controller.update('1', updateRiderDto);
      expect(result).toEqual(updatedRider); // check if update from controller call update from service
      expect(mockRidersService.updateRider).toHaveBeenCalledWith(1, updateRiderDto); // check if we actually call update in RidersService with 1 not '1'
    });
  });

  describe('remove', () => {
    it('should remove a rider', async () => {
      mockRidersService.removeRider.mockResolvedValue({ message: 'Rider deleted' });
  
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'Rider deleted' }); // check if remove from controller call removeRider from service
      expect(mockRidersService.removeRider).toHaveBeenCalledWith(1); // check if we actually call removeRider in RidersService with 1 not '1'
    });
  });
  
  describe('findNearbyRiders', () => {
    it('should return riders within 5km', async () => {
      const mockRiders = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
      
      mockRidersService.findNearbyRiders.mockResolvedValue(mockRiders);
  
      const result = await controller.findNearbyRiders('12.3456', '98.7654');
      expect(result).toEqual(mockRiders); // check if findRidersIn5Km from controller call findNearbyRiders from service
      expect(mockRidersService.findNearbyRiders).toHaveBeenCalledWith(12.3456, 98.7654); // check if we actually call findNearbyRiders in RidersService with int not string
    });
  });

  describe('createLocation', () => {
    it('should create a location for a rider', async () => {
      const riderId = 1;
      const createLocationDto: Prisma.LocationCreateInput = { 
        latitude: 12.3456, 
        longitude: 98.7654,
        rider: { connect: { id: riderId } } // Add the rider relationship
      };

      const mockLocation = { id: 1, riderId, latitude: 12.3456, longitude: 98.7654 };
      
      mockRidersService.createLocation.mockResolvedValue(mockLocation);
  
      const result = await controller.createLocation('1', createLocationDto);
      expect(result).toEqual(mockLocation); // check if createLocation from controller call createLocation from service
      expect(mockRidersService.createLocation).toHaveBeenCalledWith(1, createLocationDto); // check if we actually call createLocation in RidersService with 1 not '1'
    });
  });

  describe('findLocation', () => {
    it('should return a rider\'s location', async () => {
      const mockLocation = { id: 1, riderId: 1, latitude: 12.3456, longitude: 98.7654 };
      mockRidersService.findLocationByRiderId.mockResolvedValue(mockLocation);

      const result = await controller.findLocation('1');
      expect(result).toEqual(mockLocation); // check if findLocation from controller call findLocationByRiderId from service
      expect(mockRidersService.findLocationByRiderId).toHaveBeenCalledWith(1); // check if we actually call findLocationByRiderId in RidersService with 1 not '1'
    });
  });
  
});
