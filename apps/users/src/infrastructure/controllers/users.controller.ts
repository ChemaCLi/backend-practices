import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserCommand } from '../../application/create-user/create-user.command';
import { CreateUserService } from '../../application/create-user/create-user.service';
import { ListUsersService } from '../../application/list-users/list-users.service';
import { IUserSchema } from '../../domain/user';
import { Paginated } from '../../domain/paginated';
import { ListUsersCommand } from '../../application/list-users/list-users.command';
import { CountUsersService } from '../../application/list-users/count-users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: ListUsersService,
    private readonly countUsersService: CountUsersService,
  ) {}

  @Get('/')
  async list(
    @Query()
    { page, pageSize }: ListUsersCommand,
  ): Promise<Paginated<IUserSchema>> {
    const users = await this.listUsersService.process({ page, pageSize });
    const totalUsers = await this.countUsersService.process();

    return new Paginated<IUserSchema>(users, {
      page,
      pageSize,
      totalRecords: totalUsers,
    });
  }

  @Post()
  create(@Body() createUserCommand: CreateUserCommand): Promise<IUserSchema> {
    try {
      return this.createUserService.process(createUserCommand);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
