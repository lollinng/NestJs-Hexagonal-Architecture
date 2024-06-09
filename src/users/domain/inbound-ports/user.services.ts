import { User } from "../model/user";
import { Inject, Injectable, Logger } from "@nestjs/common";
import {  IUserService } from "./user.service.interface";
import { IUserRepository } from "../outbond-ports/user.repository.interface";


@Injectable()
export class UserService implements IUserService{
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  
  rate(id: number,rating:number,movie_id:number): Promise<number> {
    
    throw new Error("Method not implemented.");
  }
  
  async findAll(): Promise<User[]> {
    const movies = await this.userRepository.findAll();
    return movies.map(
      (user) =>
        new User(
          user.id,
          user.username,
          user.email
        ),
    );
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.remove(id);
  }
}