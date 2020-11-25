import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './class/user';
import { UsersService } from './provider/users.service';

@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService){

    }

    @Get()
    async getAll() : Promise<User[]>{
        return this.usersService.getAll();
    }

    @Get(':email')
    async getByEmail(@Param('email') email: string): Promise<User>{
        return this.usersService.getByEmail(email);
    }

    @Post()
    async create(@Body() user: User) : Promise<User> {
        return this.usersService.create(user);
    }

    @Put(':email')
    async update(@Param('email') email: string, @Body() user: User) : Promise<User>{
        user.email = email
        return this.usersService.update(user);
    }

    @Delete(':email')
    async delete(@Param('email') email: string){
        this.usersService.delete(email)
    }

}
