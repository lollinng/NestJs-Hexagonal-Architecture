import { Rating } from "../model/rating";

export interface IRatingRepository {
  create(rating: Rating): Promise<Rating>;
  CalcRating(movieId: Number):Promise<number>;
}

export const IRatingRepository = Symbol('IRatingRepository');