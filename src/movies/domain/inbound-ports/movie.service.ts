import { Inject, Injectable, Logger } from '@nestjs/common';
import { IMovieService } from './movie.service.interface';
import { IMovieRepository } from '../outbond-ports/movie.repository.interface';
import { Movie } from '../model/movie';


@Injectable()
export class MovieService implements IMovieService {
  private readonly logger = new Logger(MovieService.name);

  constructor(
    @Inject(IMovieRepository)
    private readonly movieRepository: IMovieRepository,

    
  ) {}

  sortByRating(): Promise<Movie[]> {
    return this.movieRepository.sortByRating();
  }


  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.create(movie);
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll();
    return movies.map(
      (movie) =>
        new Movie(
          movie.id,
          movie.title,
          movie.description,
          movie.releaseDate,
          movie.genre,
          movie.rating
        ),
    );
  }

  async findById(id: number): Promise<Movie | null> {
    return this.movieRepository.findById(id);
  }

  async update(id: number, movie: Partial<Movie>): Promise<Movie> {
    await this.movieRepository.update(id, movie);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.remove(id);
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll();
    return movies.filter((movie) => movie.genre === genre);
  }

  

  async updateMovieRating(movieId: number, averageRating: number) {
    await this.movieRepository.update(movieId, { rating: averageRating });
  }

}