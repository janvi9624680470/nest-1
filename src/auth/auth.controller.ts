import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  SignUpDto} from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('/signup')
     singUp(@Body() signUpDto: SignUpDto): Promise<{token:string}> {
      return this.authService.SingUp(signUpDto);
    }
  
    @Get('/login')
    login (@Body() loginDto: LoginDto): Promise<{token:string}> {
      return this.authService.Login(loginDto);
    }
}
