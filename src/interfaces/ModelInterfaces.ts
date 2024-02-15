import { Document } from "mongoose";

export interface UserDocument extends Document {
  email: String;
  name: String;
  password: String;
  role: String;
  avatar: String;
  currentAddress: String;
  permanentAddress: String;
  phone: String;
  city: String;
  country: String;
  zipCode: Number;
}

export interface BrandDocument extends Document {
  brandName: String;
  brandImage: String;
}

export interface CategoryDocument extends Document {
  categoryName: String;
}
