import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Inject,
  Logger,
  Res,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { IRatingService } from 'src/rating/domain/inbound-ports/rating.service.interface';
import { Rating } from 'src/rating/domain/model/rating';
import { CreateRatingDto } from '../dto/create-rating-dto';
import { IUserService } from 'src/users/domain/inbound-ports/user.service.interface';
import { IMovieService } from 'src/movies/domain/inbound-ports/movie.service.interface';

@Controller('ratings')
export class RatingController {
  private readonly logger = new Logger(RatingController.name);

  constructor(
      @Inject(IRatingService) private readonly ratingService: IRatingService,
      @Inject(IUserService) private readonly userService: IUserService,
      @Inject(IMovieService) private readonly movieService: IMovieService
  ) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto, @Res() res: Response) {
      try {
          const user = await this.userService.findById(createRatingDto.userId);
          if (!user) {
              return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
          }

          const movie = await this.movieService.findById(createRatingDto.movieId);
          if (!movie) {
              return res.status(HttpStatus.NOT_FOUND).json({ message: 'Movie not found' });
          }

          const rating = new Rating(
              0,
              createRatingDto.rating,
              user,
              movie
          );

          const createdRating = await this.ratingService.create(rating);
          this.logger.log(`Rating created: ${JSON.stringify(createdRating, null, 2)}`);

          const avgRating = await this.ratingService.CalcRating(createRatingDto.movieId);
          movie.rating = avgRating;
          await this.movieService.update(movie.id, movie);

          return res.status(HttpStatus.CREATED).json(createdRating);
      } catch (error) {
          this.logger.error('Error creating rating', error.message, error.stack);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
  }
}
