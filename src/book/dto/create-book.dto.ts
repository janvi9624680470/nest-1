

import { IsNotEmpty, IsEmail, MinLength, Matches, IsString, IsEmpty } from 'class-validator';
import { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export class CreateBookDto  {


  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;


  
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  content: string;

  @IsEmpty({message:'you can not pass user id '})
  readonly user:User
}