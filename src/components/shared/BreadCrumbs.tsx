import { BreadCrumbsProps } from "@/types/pagesTypes";
import Link from "next/link";
import React, { FC } from "react";

const BreadCrumbs: FC<BreadCrumbsProps> = ({ parent, child, path }) => {
  return (
    <div className="w-full flex justify-start gap-3 items-center py-3 border-b-[1px] mb-5 lg:mb-10 border-b-gray-200">
      <Link className="text-[#6453F7] font-bold" href={path}>
        {parent}{" "}
      </Link>{" "}
      <span className="text-sm text-gray-400">{">>"} </span>
      <span className="text-gray-500 text-sm">{child}</span>
    </div>
  );
};

export default BreadCrumbs;
