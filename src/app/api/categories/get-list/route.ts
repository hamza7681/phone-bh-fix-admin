import Category from "@/models/categoryModel";
import { authenticate } from "@/database/config";
import { RouteResponse } from "@/interfaces/RouteInterfaces";
import { NextRequest, NextResponse } from "next/server";

import { StatusCodes } from "http-status-codes";
import { convertCategoryData } from "@/libs/dataConversion";

type NewResponse = NextResponse<RouteResponse>;

interface Category {
  brandName: String;
}

export const POST = async (
  req: NextRequest
): Promise<NewResponse | undefined> => {
  try {
    await authenticate();
    const { temp } = (await req.json()) as { temp: string };
    const categories = await Category.find();
    return NextResponse.json({
      status: StatusCodes.OK,
      brands: convertCategoryData(categories),
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      msg: "INTERNAL_SERVER_ERROR",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
