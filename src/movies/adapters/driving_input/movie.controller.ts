import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    HttpStatus,
    Inject,
    Logger,
    Res,
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
    async findAll(@Res() res: Response) {
      try {
        const movies = await this.movieService.findAll();
        this.logger.log(JSON.stringify(movies, null, 2));
        return res.status(HttpStatus.OK).json(movies);
      } catch (error) {
        this.logger.error(error.message, error.stack);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
  
    @Post()
    async create(@Body() createMovieDto: CreateMovieDto, @Res() res: Response) {
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
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
    
    @Get('/sort')
    async sortByRating(@Res() res: Response) {
      try {
        const movies = await this.movieService.sortByRating();
        this.logger.log(JSON.stringify(movies, null, 2));
        return res.status(HttpStatus.OK).json(movies);
      } catch (error) {
        this.logger.error(error.message, error.stack);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
    
    @Get(':id')
    async findById(@Param('id') id: number, @Res() res: Response) {
      try {
        const movie = await this.movieService.findById(id);
        if (!movie) {
          return res.status(HttpStatus.NOT_FOUND).json({ message: 'Movie not found' });
        }
        this.logger.log(JSON.stringify(movie, null, 2));
        return res.status(HttpStatus.OK).json(movie);
      } catch (error) {
        this.logger.error(error.message, error.stack);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto, @Res() res: Response) {
        try {
          const updatedMovie = await this.movieService.update(id, updateMovieDto);
          if (!updatedMovie) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Movie not found' });
          }
          this.logger.log(JSON.stringify(updatedMovie, null, 2));
          return res.status(HttpStatus.OK).json(updatedMovie);
        } catch (error) {
          this.logger.error(error.message, error.stack);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
        }
      }

   
  
    @Delete(':id')
    async remove(@Param('id') id: number, @Res() res: Response) {
      try {
        await this.movieService.remove(id);
        return res.status(HttpStatus.NO_CONTENT).json();
      } catch (error) {
        this.logger.error(error.message, error.stack);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
  
  
  
    @Get('/genre/:genre')
    async findByGenre(@Param('genre') genre: string, @Res() res: Response) {
      try {
        const movies = await this.movieService.findByGenre(genre);
        this.logger.log(JSON.stringify(movies, null, 2));
        return res.status(HttpStatus.OK).json(movies);
      } catch (error) {
        this.logger.error(error.message, error.stack);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
      }
    }
  
    
  }
  