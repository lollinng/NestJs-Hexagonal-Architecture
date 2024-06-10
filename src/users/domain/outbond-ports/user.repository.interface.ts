import { User } from "../model/user";


export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  update(id: number, user: Partial<User>): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');