import { Inject, Injectable, Logger } from "@nestjs/common";
import { IRatingRepository } from "../domain/outbound-ports/rating.repository.interface";
import { Rating } from "../domain/model/rating";


@Injectable()
export class RatingService {
    private readonly logger = new Logger(RatingService.name);

    constructor(
      @Inject(IRatingRepository)
      private readonly ratingRepository: IRatingRepository,
    ) {}

  async create(rating: Rating): Promise<Rating> {
    return this.ratingRepository.create(rating);
  }

  async CalcRating(movieId: Number): Promise<Number> {
    return this.ratingRepository.CalcRating(movieId);
  }

}