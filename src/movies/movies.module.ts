import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "./adapters/driven_output/movie.entity";
import { MovieController } from "./adapters/driving_input/movie.controller";
import { IMovieService } from "./domain/inbound-ports/movie.service.interface";
import { MovieService } from "./domain/inbound-ports/movie.service";
import { IMovieRepository } from "./domain/outbond-ports/movie.repository.interface";
import { MovieRepository } from "./adapters/driven_output/movie.repository";

@Module({
  imports:[TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [
    // Product Service
    // domain in-bound - coming inside  service
    {
      provide:IMovieService,
      useClass:MovieService
    },
    // going outside to db
    {
      provide:IMovieRepository,
      useClass:MovieRepository
    }
  ],
})
export class ProductModule {}
