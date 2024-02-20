import React, { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../shared/FormInput";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

const AddUserForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userName || userName === "") {
        toast.error("Please fill missing fields");
        setLoading(false);
      } else {
        await addDoc(collection(db, "users"), {
          userName: userName,
          userEmail: userEmail,
          userGender:userGender,
          userPhone:userPhone,
        });
        toast.success("User Add");
        setLoading(false);
        setUserName("");
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 border-[1px] mt-4 border-gray-200 shadow-lg rounded-[4px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <FormInput
          label="User Name"
          referenceId="userName"
          type="text"
          placeholder="Enter user name"
          value={userName}
          handleChange={(e) => setUserName(e.target.value)}
        />
        <FormInput
          label="User Email"
          referenceId="userEmail"
          type="email"
          placeholder="Enter user email"
          value={userEmail}
          handleChange={(e) => setUserEmail(e.target.value)}
        />
        <FormInput
          label="User Gender"
          referenceId="userGender"
          type="gender"
          placeholder="Enter user gender"
          value={userGender}
          handleChange={(e) => setUserGender(e.target.value)}
        />
        <FormInput
          label="User Phone Number"
          referenceId="userPhoneNumber"
          type="tel"
          placeholder="Enter user Phone Number"
          value={userPhone}
          handleChange={(e) => setUserPhone(e.target.value)}
        />

        <button
          type="submit"
          className="text-white font-semibold flex justify-center items-center h-9 w-[120px] bg-[#6453F7] text-sm py-2 rounded-[4px]"
        >
          {loading ? <SyncLoader color="#ffffff" size={8} /> : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
