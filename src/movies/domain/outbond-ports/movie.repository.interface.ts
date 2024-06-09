import { Movie } from "../model/movie";


export interface IMovieRepository {
  create(movie: Movie): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  findById(id: number): Promise<Movie | null>;
  update(id: number, movie: Partial<Movie>): Promise<Movie>;
  remove(id: number): Promise<void>;
  sortByRating(): Promise<Movie[]>;

}

export const IMovieRepository = Symbol('IMovieRepository');