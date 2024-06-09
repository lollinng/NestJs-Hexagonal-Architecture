import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./adapters/Tyeporm_driven_output/users.entity";
import { UserController } from "./adapters/driving_input/user.controllers";
import { IUserService } from "./domain/inbound-ports/user.service.interface";
import { UserService } from "./domain/inbound-ports/user.services";
import { IUserRepository } from "./domain/outbond-ports/user.repository.interface";
import { UserRepository } from "./adapters/Tyeporm_driven_output/user.repository";

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    // Product Service
    // domain in-bound - coming inside  service
    {
      provide:IUserService,
      useClass:UserService
    },
    // going outside to db
    {
      provide:IUserRepository,
      useClass:UserRepository
    }
  ],
  exports:[IUserService]
})
export class UserModule {}
