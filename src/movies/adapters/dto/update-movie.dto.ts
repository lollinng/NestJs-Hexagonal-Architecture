import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber, Min } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsDateString()
  releaseDate: Date; 

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rating: number;
}