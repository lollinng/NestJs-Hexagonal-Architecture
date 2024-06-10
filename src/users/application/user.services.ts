import { Inject, Injectable, Logger } from "@nestjs/common";
import { IUserService } from "../domain/inbound-ports/user.service.interface";
import { IUserRepository } from "../domain/outbond-ports/user.repository.interface";
import { User } from "../domain/model/user";



@Injectable()
export class UserService implements IUserService{
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  
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

}