import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logInUser(
        @Body('username') username: string,
        @Body('phone') phone: string,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.login(username, phone)
    }

    @Post('verify')
    async verifyUser(
        @Body('token') token: string
    ) {
        if (token) {
            return this.authService.verifyAuth(token)
        }
        return new BadRequestException("Auth tidak sesuai")
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
