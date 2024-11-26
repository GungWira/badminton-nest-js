import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Order, User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers()
    }

    @Get(':query')
    async getUserByQuery(@Param('query') query: string): Promise<User[]> {
        return this.userService.getUserByData(query);
    }

    @Get('order/:id')
    async getUserOrderById(@Param('id') id: number): Promise<Order[]> {
        return this.userService.getUserOrder(id);
    }

    @Delete('delete/:id')
    async deleteUserById(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser({ id: parseInt(id) })
    }
}
