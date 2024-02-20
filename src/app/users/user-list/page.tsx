"use client";

import BrandTable from "@/components/brands/BrandTable";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import GlobalLoader from "@/components/shared/GlobalLoader";
import Navbar from "@/components/shared/Navbar";
import UsersTable from "@/components/users/UsersTable";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserList: FC = () => {
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
            <BreadCrumbs parent="users" path="/users/user-list" />
            <h1 className="text-[#6453F7] text-[22px] font-semibold">
              Users List
            </h1>
            <UsersTable/>
          </div>
        </Navbar>
      )}
    </>
  );
};

export default UserList;
