import { Body, Controller, Get, Post, Put, Delete, Param, HttpStatus, Inject, Logger, Res, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { IUserService } from 'src/users/domain/inbound-ports/user.service.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from 'src/users/domain/model/user';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(@Inject(IUserService) private readonly userService: IUserService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = new User(
        0,
        createUserDto.username,
        createUserDto.email,
      );
      const createdUser = await this.userService.create(user);
      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      const updatedUser = await this.userService.update(id, updateUserDto);
      console.log(updatedUser)
      return res.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    this.logger.error(error.message, error.stack);
    throw new InternalServerErrorException('An error occurred');
  }
}
