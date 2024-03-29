"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import logo from "../../public/assets/logo_black.webp";
import { SyncLoader } from "react-spinners";
import Image from "next/image";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducers/authslice";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/shared/GlobalLoader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { singleDataFireStore } from "@/utils/singleDataFireStore";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((s: any) => s.auth);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading1(false);
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (res: any) => {
        const user = await singleDataFireStore("email", email, "users");
        if (user.role === 1) {
          dispatch(login({ token: res.user.accessToken, user: user }));
          router.push("/dashboard");
        } else {
          toast.error("Only admin can login");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.message === "Firebase: Error (auth/invalid-email)." ||
          error.message === "Firebase: Error (auth/missing-password)." ||
          error.message === "Firebase: Error (auth/invalid-credential)."
        ) {
          toast.error("Invalid email/password");
        }
        setLoading(false);
      });
  };

  return (
    <>
      {loading1 ? (
        <GlobalLoader />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-[95%] lg:w-[500px] border-[1px] border-gray-200 shadow-lg px-5 py-10 rounded-[4px]">
            {/* <div className="w-full h-[150px] overflow-hidden flex justify-center items-center">
              <Image
                src={logo}
                alt="logo"
                className="w-[300px]"
                loading="eager"
              />
            </div> */}
            <h1 className="text-center text-[#6453F7] text-[32px] mb-10 font-semibold">
              Admin Dashboard
            </h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border-[1px] border-gray-200 rounded-[3px] focus:outline-none"
              />
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 border-[1px] border-gray-200 rounded-[3px] focus:outline-none"
              />
              <div className="flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  checked={show}
                  onChange={(e) => setShow(e.target.checked)}
                  id="box"
                />
                <label className="text-sm text-gray-400" htmlFor="box">
                  Show Password
                </label>
              </div>
              <button
                type="submit"
                className="flex bg-[#6453F7] rounded-full h-10 justify-center items-center text-white font-semibold"
              >
                {loading ? <SyncLoader color="#ffffff" size={8} /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
