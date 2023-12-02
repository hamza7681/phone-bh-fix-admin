import { Category } from "@/models/categoryModel";
import {
  BrandData,
  CategoryData,
  UserData,
} from "@/interfaces/RouteInterfaces";
import { Types } from "mongoose";

export const convertUserData = (user: any): UserData => {
  return {
    _id: user._id as Types.ObjectId,
    email: user.email as string,
    name: user.name as string,
    role: user.role as string,
    avatar: user.avatar as string,
    currentAddress: user.currentAddress as string,
    permanentAddress: user.permanentAddress as string,
    phone: user.phone as string,
    city: user.city as string,
    country: user.country as string,
    zipCode: user.zipCode as number,
  };
};

export const convertBrandData = (brand: any): BrandData => {
  return brand.map((x: any) => {
    return {
      _id: x._id as Types.ObjectId,
      brandImage: x.brandImage as string,
      brandName: x.brandName as string,
    };
  });
};

export const convertSingleBrandData = (brand: any): BrandData => {
  return {
    _id: brand._id as Types.ObjectId,
    brandImage: brand.brandImage as string,
    brandName: brand.brandName as string,
  };
};

export const convertCategoryData = (category: any): CategoryData => {
  return category.map((x: any) => {
    return {
      id: x._id as Types.ObjectId,
      categoryName: x.categoryName as string,
    };
  });
};
