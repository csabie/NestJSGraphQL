import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from '../owners/owners.module';
import { Pet } from './pet.entity';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), OwnersModule], // ezt akkor lehet megcsinálni, ha a PetService contructor-ában az @InjectRepository(Pet) használva van
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
