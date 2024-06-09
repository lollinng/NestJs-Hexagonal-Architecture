import { IsOptional } from 'class-validator';
import { UserEntity } from 'src/users/adapters/Tyeporm_driven_output/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @Column()
  genre: string;

  @Column({ type: 'float', nullable: true })
  @IsOptional()
  rating: number | null; 
}