import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interfaces/book.interface';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Query } from 'express-serve-static-core';




@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) { }


  async create(createBookDto: CreateBookDto, user: User): Promise<Book> {


    const data = Object.assign(createBookDto, { user: user._id })
    const existingBook = await this.bookModel.findOne({ title: createBookDto.title }).exec();
    if (existingBook) {
      throw new ConflictException('A book with this title already exists.');
    }
    const createdBook = new this.bookModel(data);
    return createdBook.save();
  }

  async findAll(query: Query  ): Promise<Book[]> {

    try {
      const searchCondition = query.title
        ? { title: { $regex: query.title, $options: 'i' } }
        : {};
      const books = await this.bookModel.find(searchCondition).exec();
      return books;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve books');
    }

  }

  async findOne(id: string): Promise<Book> {

    // try {

    //   const isValidId = mongoose.isValidObjectId(id)
    //   if (!isValidId) {
    //     throw new BadRequestException(`please enter corre id `);
    //   }
    //   const book = await this.bookModel.findById(id).exec();
    //   if (!book) {
    //     throw new NotFoundException(`Book with id ${id} not found`);
    //   }
    //   return book;
    // } catch (error) {
    //   // throw new NotFoundException(`Book with ID ${id} doesn't exist`);
    // }




    const isValidId = mongoose.isValidObjectId(id)
    if (!isValidId) {
      throw new BadRequestException(`please enter corre id `);
    }
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;



  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {


    // try {
    //   const isValidId = mongoose.isValidObjectId(id)
    //   if (!isValidId) {
    //     throw new BadRequestException(`please enter corre id `);
    //   }
    //   const book = await this.bookModel.findById(id);
    //   if (!book) {
    //     throw new NotFoundException(`User with ID ${id} doesn't exist`);

    //   }

    //   const existingBook = await this.bookModel.findOne({ title: updateBookDto.title });
    //   if (existingBook) {
    //     throw new UnauthorizedException('Book already exists');
    //   }
    //   const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
    //   return updatedBook
    // } catch (error) {

    //   if (error instanceof UnauthorizedException) {
    //     throw error;
    //   } else {
    //     // Handle other errors such as book not found
    //     throw new NotFoundException(`Book with ID ${id} not found`);
    //   }
    // }

    const isValidId = mongoose.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException(`please enter corre id `);
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`User with ID ${id} doesn't exist`);

    }

    const existingBook = await this.bookModel.findOne({ title: updateBookDto.title });
    if (existingBook) {
      throw new UnauthorizedException('Book already exists');
    }
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
    return updatedBook







  }

  async delete(id: string): Promise<Book> {
    // try {
    //   await this.findOne(id);
    //   const book = await this.bookModel.findByIdAndDelete(id).exec();
    //   return book;
    // } catch (error) {
    //   throw new NotFoundException(`User with ID ${id} not found`);
    // }

    const isValidId = mongoose.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException(`please enter corre id `);
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`User with ID ${id} doesn't exist`);

    }
    return await this.bookModel.findByIdAndDelete(id).exec();

  }
}
