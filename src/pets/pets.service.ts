import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../owners/entities/owner.entity';
import { OwnersService } from '../owners/owners.service';

import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRespository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRespository.create(createPetInput);

    return this.petsRespository.save(newPet); //insert
  }
  findAll(): Promise<Pet[]> {
    // const pet = new Pet();
    // pet.id = 1;
    // pet.name = 'Mambo';

    // return [pet];

    return this.petsRespository.find(); // select * from pet
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRespository.findOneOrFail(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
