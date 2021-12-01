import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  //   {
  //       pets{
  //           id,
  //           name
  //       }
  //   }
  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  // {
  //   getPet(id: 1){
  //     name
  //   }
  // }
  @Query((returns) => Pet)
  //id alapján query-zés
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  //Miután mindet setteltünk, visszaadja az id-t és a name-t
  //   mutation{
  //     createPet(createPetInput: {
  //         name: "Heyoo"
  //     }){

  //         id,
  //         name
  //     }
  // }

  //1:N esete
  // először beállítjuk az ownert
  // mutation{
  //   createOwner(createOwnerInput: {
  //    name: "First"
  //  }){id, name}
  // }

  // aztán

  //   mutation{
  //     createPet(createPetInput: {
  //         name: "Heyoo",
  //         ownerId: 1
  //     }){

  //         id,
  //         name
  //     }
  // }
  @Mutation((returns) => Pet)
  //a @Args-paraméterét ha kicseréljül, akkor autmatikusan frissöl a schema.gql-ben is
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }

  //1:N esete
  //lekérjük az adatokat
  // {
  //   pets {
  //     id,
  //     name,
  //     owner{
  //       name
  //     }
  //   }
  // }
  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
