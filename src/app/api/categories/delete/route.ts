import { authenticate } from "@/database/config";
import { RouteResponse } from "@/interfaces/RouteInterfaces";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { convertSingleCategoryData } from "@/libs/dataConversion";

type NewResponse = NextResponse<RouteResponse>;
const SECRET = process.env.JWT_SECRET;

export const POST = async (
  req: NextRequest
): Promise<NewResponse | undefined> => {
  try {
    await authenticate();
    const token = req.headers.get("authorization");
    let userId: string | null = null;
    if (token) {
      const { id } = (await req.json()) as { id: string };
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
        const category = await Category.findByIdAndDelete(id);
        return NextResponse.json({
          msg: "CategoryDe deleted successfully",
          status: StatusCodes.OK,
          category: convertSingleCategoryData(category),
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
