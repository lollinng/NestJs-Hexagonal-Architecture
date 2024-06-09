import { Movie } from "../model/movie";

export interface IMovieService {
  create(movie: Movie): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  findById(id: number): Promise<Movie | null>;
  update(id: number, movie: Partial<Movie>): Promise<Movie>;
  remove(id: number): Promise<void>;
  rateMovie(id: number, rating: number): Promise<Movie>;
  findByGenre(genre: string): Promise<Movie[]>;
  sortByRating(): Promise<Movie[]>;
}

export const IMovieService = Symbol('IMovieService');
