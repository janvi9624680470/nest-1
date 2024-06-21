
import { IsNotEmpty, IsEmail, MinLength, Matches, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({},{message:'pleace eneter correct email '})
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}