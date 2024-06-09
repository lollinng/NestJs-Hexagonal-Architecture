import { Controller, Post, Body, Param, Put, Inject, Logger, Res, HttpStatus, Get } from '@nestjs/common';
import { IRatingService } from 'src/rating/domain/inbound-ports/rating.service.interface';
import { Rating } from 'src/rating/domain/model/rating';
import { CreateRatingDto } from '../dto/create-rating-dto';
import { IUserService } from 'src/users/domain/inbound-ports/user.service.interface';
import { IMovieService } from 'src/movies/domain/inbound-ports/movie.service.interface';
import { Response } from 'express';
import { Console } from 'console';

@Controller('ratings')
export class RatingController {
    private readonly logger = new Logger(RatingController.name);

    constructor(
        @Inject(IRatingService) private readonly ratingService: IRatingService,
        @Inject(IUserService) private readonly userService: IUserService,
        @Inject(IMovieService) private readonly movieService: IMovieService
    
    ) {}
  
    @Get()
    getHello(): string {
    return "hi";
    }

    @Post()
    async create(@Body() createRatingDto: CreateRatingDto, @Res() res: Response) {
      try {
        
        const user = await this.userService.findById(createRatingDto.userId);
        console.log("errro")
        const movie = await this.movieService.findById(createRatingDto.movieId);
        
        const rating = new Rating(
          0,
          createRatingDto.rating,
          user,
          movie
        );

        // RATING IS CREATED
        const createdRating = await this.ratingService.create(rating);
        this.logger.log(JSON.stringify(createdRating, null, 2));
        console.log("hi")
        // FUNCTION IS CALLED TO UPDATE THE MOVIE RATING
        const avg_rating:number = await this.ratingService.findMovie(createRatingDto.movieId)
        console.log("errro",avg_rating,movie)
        movie.rating = avg_rating
        this.movieService.update(movie.id, movie);
        console.log('bye',createRatingDto.rating,);
        return res.status(HttpStatus.CREATED).json(createdRating);
      } catch (error) {
        this.logger.error(error.message, error.stack);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
}