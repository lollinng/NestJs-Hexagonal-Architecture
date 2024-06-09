import {IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRatingDto {

    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    movieId: number;

}


