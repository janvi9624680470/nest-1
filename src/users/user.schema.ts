import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false }) // Optional reference to User
  user?: User;
}

export const UserSchema = SchemaFactory.createForClass(User);


