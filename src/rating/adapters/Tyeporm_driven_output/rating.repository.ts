import { Injectable, Logger } from '@nestjs/common';
import { Rating } from 'src/rating/domain/model/rating';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { RatingEntity } from './rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRatingRepository } from 'src/rating/domain/outbound-ports/rating.repository.interface';

@Injectable()
export class RatingRepository implements IRatingRepository {
  private readonly logger = new Logger(RatingRepository.name);

  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}
 
  async findMovie(movieId: number): Promise<number> {
    const ratings = await this.ratingRepository.find({
      where: { movie: { id: Equal(movieId) } },
    })

    if (ratings.length === 0) {
      return 0; // or some other default value
    }

    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = sum / ratings.length;

    return averageRating;
  };

  async create(rating: Rating): Promise<Rating> {
    const ratingEntity: DeepPartial<RatingEntity> = {
        rating: rating.rating,
        user: rating.user,
        movie: rating.movie,
    };
    const createdRating = await this.ratingRepository.save(ratingEntity);
    this.logger.log(JSON.stringify(createdRating, null, 2));
    return this.entityToModel(createdRating);
  }



  private entityToModel(ratingEntity: RatingEntity): Rating {
      return new Rating(
      ratingEntity.id,
      ratingEntity.rating,
      ratingEntity.user,
      ratingEntity.movie,
      );
  }

}
