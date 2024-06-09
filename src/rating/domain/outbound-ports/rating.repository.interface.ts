import { Rating } from "../model/rating";

export interface IRatingRepository {
  create(rating: Rating): Promise<Rating>;
  findMovie(movieId: Number):Promise<number>;
}

export const IRatingRepository = Symbol('IRatingRepository');