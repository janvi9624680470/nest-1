import { Document } from "mongoose";

export interface Book extends Document {
  // _id?: string;
  title: string;
  author: string;
  content: string;
  // user?:string

}