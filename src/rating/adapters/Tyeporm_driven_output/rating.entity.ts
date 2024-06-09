// rating.entity.ts
import { MovieEntity } from 'src/movies/adapters/Tyeporm_driven_output/movie.entity';
import { UserEntity } from 'src/users/adapters/Tyeporm_driven_output/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.id)
  movie: MovieEntity;
}


