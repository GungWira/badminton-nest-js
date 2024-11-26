import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUniqueUser(phone: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                phone
            }
        })
    }

    async getAllUsers(): Promise<User[] | null> {
        return this.prisma.user.findMany()
    }

    async getUserByData(
        value: string
    ): Promise<User[] | null> {
        const numericValue = parseInt(value, 10)

        return this.prisma.user.findMany({
            where: {
                OR: [
                    { id: isNaN(numericValue) ? undefined : numericValue },
                    {
                        username: { contains: value }
                    },
                    {
                        phone: { contains: value }
                    }
                ]
            }
        })
    }

    async addUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data
        })
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        })
    }

    async getUserOrder(id: number) {
        return this.prisma.order.findMany({
            where: {
                id
            }
        })
    }


}
