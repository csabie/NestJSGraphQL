import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//npm i graphql-tools graphql apollo-server-express
//module generálás: nest g module pets
// service generálás: nest g service pets,
//resolver generálás: nest g resolver pets

//localhost:3000/graphql segíségével el lehet érni.

//npm i @nestjs/typeorm typeorm sqlite3

//npm install class-validator class-transformer    -> a main.ts-ben be kell állítani néhány dolgoz a validation-hoz: app.useGlobalPipes(new ValidationPipe());

//lehetséges egy egész modell generálása, boilerplate osztályokkal, CRUD metódusokkal, module-lal, resolver-rel, service-vel, stb: nest g resource owners. Itt egy owners-t létrehozunk
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
