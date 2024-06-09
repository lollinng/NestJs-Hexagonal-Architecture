import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/users/domain/model/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { IUserRepository } from 'src/users/domain/outbond-ports/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const movies = await this.repository.find();
    if (!movies) {
      return [];
    }
    this.logger.log(JSON.stringify(movies, null, 2));
    return movies.map(movie => this.entityToModel(movie));
  }
  
  async create(user: User): Promise<User> {
    const userEntity: DeepPartial<UserEntity> = {
      username: user.username,
      email: user.email,
    };
    const createdUser = await this.repository.save(userEntity);
    this.logger.log(JSON.stringify(createdUser, null, 2));
    return this.entityToModel(createdUser);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    this.logger.log(JSON.stringify(user, null, 2));
    return this.entityToModel(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const userEntity: DeepPartial<UserEntity> = {
        username: user.username,
        email:user.email
      };
    const updateResult: UpdateResult = await this.repository.update(id, userEntity as DeepPartial<UserEntity>);
    
    if (updateResult.affected !== 1) {
    throw new Error(`Failed to update user with id ${id}`);
    }
    
    const updatedUser = await this.repository.findOne({ where: { id } });
    if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
    }
    
    this.logger.log(JSON.stringify(updatedUser, null, 2));
    return this.entityToModel(updatedUser);
}

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  
  private entityToModel(userEntity: UserEntity): User {
      return new User(
      userEntity.id,
      userEntity.username,
      userEntity.email,
      );
  }

}
