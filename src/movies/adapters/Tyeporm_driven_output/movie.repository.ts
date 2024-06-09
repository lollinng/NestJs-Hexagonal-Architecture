import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/domain/model/movie';
import { MovieEntity } from './movie.entity';
import { IMovieRepository } from 'src/movies/domain/outbond-ports/movie.repository.interface';


@Injectable()
export class MovieRepository implements IMovieRepository {
  private readonly logger = new Logger(MovieRepository.name);

  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}
  

  async create(movie: Movie): Promise<Movie> {
    const movieEntity: DeepPartial<MovieEntity> = {
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate.toISOString(), // Convert Date to string
      genre: movie.genre,
    };
    const createdMovie = await this.movieRepository.save(movieEntity);
    this.logger.log(JSON.stringify(createdMovie, null, 2));
    return this.entityToModel(createdMovie);
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find();
    if (!movies) {
      return [];
    }
    this.logger.log(JSON.stringify(movies, null, 2));
    return movies.map(movie => this.entityToModel(movie));
  }

  async findById(id: number): Promise<Movie | null> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      return null;
    }
    this.logger.log(JSON.stringify(movie, null, 2));
    return this.entityToModel(movie);
  }

  async update(id: number, movie: Partial<Movie>): Promise<Movie> {
    const movieEntity: DeepPartial<MovieEntity> = {
        title: movie.title,
        description: movie.description,
        releaseDate: movie.releaseDate, 
        genre: movie.genre,
        rating: movie.rating,
      };
    const updateResult: UpdateResult = await this.movieRepository.update(id, movieEntity as DeepPartial<MovieEntity>);
    
    if (updateResult.affected !== 1) {
      throw new Error(`Failed to update movie with id ${id}`);
    }
    
    const updatedMovie = await this.movieRepository.findOne({ where: { id } });
    if (!updatedMovie) {
        throw new Error(`Movie with id ${id} not found`);
    }
    
    this.logger.log(JSON.stringify(updatedMovie, null, 2));
    return this.entityToModel(updatedMovie);
}

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }

  async sortByRating(): Promise<Movie[]> {
    const movies = await this.movieRepository.createQueryBuilder('movie')
      .orderBy('movie.rating IS NULL', 'ASC')
      .addOrderBy('movie.rating', 'DESC')
      .getMany();
    this.logger.log(JSON.stringify(movies, null, 2));
    return movies.map(movie => this.entityToModel(movie));
  }
  
  private entityToModel(movieEntity: MovieEntity): Movie {
      return new Movie(
      movieEntity.id,
      movieEntity.title,
      movieEntity.description,
      new Date(movieEntity.releaseDate), // Convert string to Date
      movieEntity.genre,
      movieEntity.rating
      );
    }


}


