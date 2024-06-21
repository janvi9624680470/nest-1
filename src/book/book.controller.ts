import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces/book.interface';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';



@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard())
   create(
    @Body() createBookDto: CreateBookDto,
    @Req() req
  ): Promise<Book> {
    // console.log(req.user)
    return this.bookService.create(createBookDto , req.user);
  }

  @Get()
   findAll(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Get(':id')
   findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
   update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
   delete(@Param('id') id: string): Promise<Book>  {
    return this.bookService.delete(id);
  }
}
