import { User } from "../model/user";

export interface IUserService {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    rate(id: number,rating:number,movie_id:number):Promise<number>;
  }

  export const IUserService = Symbol('IUserService');