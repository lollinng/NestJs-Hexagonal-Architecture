import { Movie } from "src/movies/domain/model/movie";
import { User } from "src/users/domain/model/user";

export class Rating {
  id: number;
  rating: number;
  user: User;
  movie: Movie;

  constructor(id: number, rating: number,user: User,movie: Movie ){
    this.id = id;
    this.rating = rating;
    this.user=user;
    this.movie=movie;
  }
}
