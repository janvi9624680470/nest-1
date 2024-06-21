import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';



@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
  async create(createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException(
        'User with the email already exists.',
      )

    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error retrieving users:', error);

      // Throw a generic error message
      throw new InternalServerErrorException
      
         
      ('Failed to retrieve users');
    }
    // return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
  try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} doesn't exist`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} doesn't exist`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findOne(id);
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      await this.findOne(id);
      return this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
  }
}
