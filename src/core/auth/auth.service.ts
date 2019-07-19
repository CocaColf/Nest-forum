import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('JwtService') private readonly jwtService: JwtService
    ) {}

    async createToken(payload: { account: string }): Promise<string> {
        return this.jwtService.sign(payload);
    }
}