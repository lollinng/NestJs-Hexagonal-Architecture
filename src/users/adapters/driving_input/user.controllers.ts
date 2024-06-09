import { Body, Controller, Get, Post, Put, Delete, Param, HttpStatus, Inject, Logger, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUserService } from 'src/users/domain/inbound-ports/user.service.interface';
import { User } from 'src/users/domain/model/user';
import { CreateUserDto } from '../dto/create-usert.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(@Inject(IUserService) private readonly userService: IUserService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      this.logger.log(JSON.stringify(users, null, 2));
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
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
      this.logger.log(JSON.stringify(createdUser, null, 2));
      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      this.logger.log(JSON.stringify(user, null, 2));
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      if (!updatedUser) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      this.logger.log(JSON.stringify(updatedUser, null, 2));
      return res.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.userService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).json();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }
}
