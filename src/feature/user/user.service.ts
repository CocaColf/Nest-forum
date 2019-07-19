import { Injectable, Inject, HttpException } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoUtil } from 'src/common/utils/crypto.util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @Inject('CryptoUtil') private readonly cryptoUtil: CryptoUtil
    ){}
    async login(account: string, password: string): Promise<void> {
        const user = await this.findOneByAccount(account);
        if(!user) {
            throw new HttpException('登录帐号不正确', 406);
        }
        if(!this.cryptoUtil.checkPassword(password, user.password)) {
            throw new HttpException('登录密码错误', 406);
        }
    }

    async register(user: User): Promise<void> {

    }

    // 通过账号查询用户
    async findOneByAccount(account: string): Promise<User> {
        return this.userRepo.findOne( {account} );
    }
}