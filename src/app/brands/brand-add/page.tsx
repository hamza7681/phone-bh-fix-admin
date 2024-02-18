"use client";

import AddBrandForm from "@/components/brands/AddBrandForm";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import GlobalLoader from "@/components/shared/GlobalLoader";
import Navbar from "@/components/shared/Navbar";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BrandAdd: FC = () => {
  const { token } = useSelector((s: any) => s.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Navbar>
          <div className="flex flex-col">
            <BreadCrumbs
              parent="Brands"
              child="Add Brand"
              path="/brands/brand-list"
            />
            <h1 className="text-[#6453F7] text-[22px] font-semibold">
              Add Brand
            </h1>
            <AddBrandForm />
          </div>
        </Navbar>
      )}
    </>
  );
};

export default BrandAdd;
