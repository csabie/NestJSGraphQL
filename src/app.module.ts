import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    //itt most code first megközelítést alkalmazzuk. ELőször a .ts file-ban megcsináljuk a modellt és azt egy schema.gql file-ba legeneráljuk
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // a TypeOrm egy sqlite driver
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // a refresheljük, akkor elfelejt mindent, mert memoriába írjuk bele az adatot.
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, //production-ban nem szokás a synchronize-t használni. Migrations-t szokás használni
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
