import { Controller, Post, Body, Inject } from '@nestjs/common';
import { Result } from 'src/common/interface/result.interface';
import { UserService } from './user.service';
import { AuthService } from 'src/core/auth/auth.service';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        @Inject('UserService') private readonly userService: UserService,
        @Inject('AuthService') private readonly authService: AuthService
    ) {}
    
    // 登录
    @Post('login')
    async login(@Body() body: { account: string, password: string}): Promise<Result> {
        await this.userService.login(body.account, body.password);
        const accessToken = await this.authService.createToken({ account: body.account} );
        return { code: 200, message: '登陆成功', data: accessToken };
    }

    // 注册
    @Post('register')
    async register(@Body() user: User) {
        await this.userService.register(user);
        return { code: 200, message: '注册成功'};
    }
}

