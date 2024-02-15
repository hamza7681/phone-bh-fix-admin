import { authenticate } from "@/database/config";
import { RouteResponse } from "@/interfaces/RouteInterfaces";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

type NewResponse = NextResponse<RouteResponse>;
const SECRET = process.env.JWT_SECRET;

interface Category {
  categoryName: String;
}

export const POST = async (
  req: NextRequest
): Promise<NewResponse | undefined> => {
  try {
    await authenticate();
    const token = req.headers.get("authorization");
    let userId: string | null = null;
    if (token) {
      const { categoryName } = (await req.json()) as Category;
      jwt.verify(token, SECRET as string, (err, user) => {
        if (err) {
          return NextResponse.json({
            msg: "Invalid Token",
            status: StatusCodes.UNAUTHORIZED,
          });
        }
        if (user) {
          userId = user as string;
        }
      });
      if (userId) {
        const newCategory = new Category({ categoryName });
        await newCategory.save();
        return NextResponse.json({
          msg: "Category added successfully",
          status: StatusCodes.OK,
        });
      }
    } else {
      return NextResponse.json({
        msg: "Unauthorized",
        status: StatusCodes.UNAUTHORIZED,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error,
      msg: "INTERNAL_SERVER_ERROR",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
