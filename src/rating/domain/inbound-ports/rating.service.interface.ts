import { Rating } from "../model/rating";


export interface IRatingService {
  create(rating: Rating): Promise<Rating>;
  findMovie(movieId: Number):Promise<number>;
}

export const IRatingService = Symbol('IRatingService');