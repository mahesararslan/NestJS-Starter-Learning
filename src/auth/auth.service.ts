import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException('User not found');

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
        return { id: user.id };
    }

    async login(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        return this.jwtService.sign(payload);
    }

    async validateJwtUser(userId: number) { 
        const user = await this.userService.findOne(userId);
        if (!user) throw new UnauthorizedException('User not found');
        const currentUser: CurrentUser = { id: user.id, role: user.role };
        return currentUser;
    }

}
