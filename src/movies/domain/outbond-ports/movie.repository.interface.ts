import { Movie } from "../model/movie";


export interface IMovieRepository {
  create(movie: Movie): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  findById(id: number): Promise<Movie | null>;
  update(id: number, movie: Partial<Movie>): Promise<Movie>;
  sortByRating(): Promise<Movie[]>;

}

export const IMovieRepository = Symbol('IMovieRepository');