import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private jwtService: JwtService) { }



    async SingUp(signUpDto :SignUpDto) :
    Promise<{token:string }>  {
        const { name, email, password } = signUpDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id })
        return {token}

    }

    async Login(loginDto:LoginDto): Promise<{token:string }> {
        const {  email ,  password } = loginDto;

        const user =await  this.userModel.findOne({email})

        if(!user){
            throw new UnauthorizedException('invalide email and password')
        }

        const isPasswordMatched = await bcrypt.compare(password , user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException('invalide email and password')
        }
        const token = this.jwtService.sign({ id: user._id })
        return {token}

    }
}
