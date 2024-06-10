import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingEntity } from "./adapters/Tyeporm_driven_output/rating.entity";
import { RatingController } from "./adapters/driving_input/rating.controller";
import { IRatingService } from "./domain/inbound-ports/rating.service.interface";
import { RatingService } from "./application/rating.service";
import { IRatingRepository } from "./domain/outbound-ports/rating.repository.interface";
import { RatingRepository } from "./adapters/Tyeporm_driven_output/rating.repository";
import { UserModule } from "src/users/users.module";
import { MovieModule } from "src/movies/movies.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([RatingEntity]),
    UserModule, MovieModule // Ensure UserModule and MovieModule are imported
  
  ],
  controllers: [RatingController],
  providers: [
    // Product Service
    // domain in-bound - coming inside  service
    {
      provide:IRatingService,
      useClass:RatingService
    },
    // going outside to db
    {
      provide:IRatingRepository,
      useClass:RatingRepository
    }
  ],
})
export class RatingModule {}
