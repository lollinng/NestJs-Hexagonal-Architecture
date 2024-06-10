import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpStatus,
  Inject,
  Logger,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { IMovieService } from 'src/movies/domain/inbound-ports/movie.service.interface';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from 'src/movies/domain/model/movie';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  private readonly logger = new Logger(MovieController.name);

  constructor(@Inject(IMovieService) private readonly movieService: IMovieService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const movies = await this.movieService.findAll();
      if (movies.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).json({ message: 'No movies found' });
      }
      this.logger.log(JSON.stringify(movies, null, 2));
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while retrieving movies' });
    }
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto, @Res() res: Response): Promise<Response> {
    try {
      const movie = new Movie(
        0,
        createMovieDto.title,
        createMovieDto.description,
        new Date(createMovieDto.releaseDate),
        createMovieDto.genre,
      );

      const createdMovie = await this.movieService.create(movie);
      this.logger.log(JSON.stringify(createdMovie, null, 2));
      return res.status(HttpStatus.CREATED).json(createdMovie);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while creating the movie' });
    }
  }

  @Get('/sort')
  async sortByRating(@Res() res: Response): Promise<Response> {
    try {
      const movies = await this.movieService.sortByRating();
      if (movies.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).json({ message: 'No movies found' });
      }
      this.logger.log(JSON.stringify(movies, null, 2));
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while sorting movies by rating' });
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const movie = await this.movieService.findById(id);
      if (!movie) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: `Movie with ID ${id} not found` });
      }
      this.logger.log(JSON.stringify(movie, null, 2));
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while retrieving the movie' });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const updatedMovie = await this.movieService.update(id, updateMovieDto);
      if (!updatedMovie) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: `Movie with ID ${id} not found` });
      }
      this.logger.log(JSON.stringify(updatedMovie, null, 2));
      return res.status(HttpStatus.OK).json(updatedMovie);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while updating the movie' });
    }
  }

  @Get('/genre/:genre')
  async findByGenre(@Param('genre') genre: string, @Res() res: Response): Promise<Response> {
    try {
      const movies = await this.movieService.findByGenre(genre);
      if (movies.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).json({ message: `No movies found in genre ${genre}` });
      }
      this.logger.log(JSON.stringify(movies, null, 2));
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while retrieving movies by genre' });
    }
  }
}
