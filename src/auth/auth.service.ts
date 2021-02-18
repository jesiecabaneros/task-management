import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { userRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(userRepository)
        private userRepository: userRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
     return this.userRepository.signUp(authCredentialDto);
    }
    async signIn(authCredentialDto: AuthCredentialsDto) : Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        if(!username) {
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload : JwtPayload = { username };
        const accessToken =  await this.jwtService.sign(payload)
        console.log(username);
        return {accessToken};
        
    }
}
