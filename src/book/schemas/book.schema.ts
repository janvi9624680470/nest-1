import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Book extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true , minlength: 20 })
  content: string;

  @Prop({type:mongoose.Schema.Types.ObjectId , ref:'User'})
  user: User;

}

export const BookSchema = SchemaFactory.createForClass(Book);




