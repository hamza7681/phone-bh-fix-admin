import React from "react";
import { HashLoader } from "react-spinners";

const GlobalLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <HashLoader color="#6453F7" />
    </div>
  );
};

export default GlobalLoader;
