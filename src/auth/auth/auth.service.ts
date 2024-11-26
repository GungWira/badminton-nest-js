import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(username: string, phone: string): Promise<{ access_token: string }> {

        let user = await this.userService.getUniqueUser(phone)
        if (!user) {
            user = await this.userService.addUser({ username, phone })
        }
        if (user?.username !== username) {
            user = await this.userService.updateUser({
                where: { phone },
                data: { username }
            })
        }

        return { access_token: await this.jwtService.signAsync(user) }
    }


    async verifyAuth(token: string) {
        return this.jwtService.verifyAsync(token)
    }
}
