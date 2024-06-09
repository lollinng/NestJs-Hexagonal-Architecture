import { Inject, Injectable, Logger } from "@nestjs/common";
import { IRatingRepository } from "../outbound-ports/rating.repository.interface";
import { Rating } from "../model/rating";


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

  async findMovie(movieId: Number): Promise<Number> {
    return this.ratingRepository.findMovie(movieId);
  }

}