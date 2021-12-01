import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha() //validátor miatt használhatjuk. Ha pl megadunk egy olyan nevet, amelyben szerepel szám is(Bob123), akkor exception-ra ugrik
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field((type) => Int)
  ownerId: number;
}
