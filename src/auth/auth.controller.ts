import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredential: AuthCredentialsDto ){
        return this.authService.signUp(authcredential);
    }

    @Post('/login')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }
    @Get('/test')
    @UseGuards(AuthGuard())
    test(){
        return 'ok';
    }

}
