export class Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  rating: number;

  constructor(
    id: number,
    title: string,
    description: string,
    releaseDate: Date,
    genre: string,
    rating: number=0,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.rating = rating;
  }
}
