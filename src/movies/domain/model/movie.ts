export class Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    releaseDate: Date,
    genre: string,
    rating: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.rating = rating;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}