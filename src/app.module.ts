import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule globally available
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/dummy'),
    UsersModule,
    AuthModule,
    BookModule,
 

  ],
  controllers: [AuthController],
  
  providers: [],
})
export class AppModule {}
