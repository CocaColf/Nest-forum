import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class CryptoUtil {
    // 加密登录密码
    encryptPassword(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }

    // 检查密码是否正确
    checkPassword(password: string, encryptPassword): boolean {
        const currentPass = this.encryptPassword(password);
        if(currentPass === encryptPassword) {
            return true;
        }

        return false;
    }
}