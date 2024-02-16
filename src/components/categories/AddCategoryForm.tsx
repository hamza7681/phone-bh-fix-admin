import React, { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../shared/FormInput";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((s: any) => s.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!categoryName || categoryName === "") {
        toast.error("Please fill missing fields");
        setLoading(false);
      } else {
        const result = await axios.post(
          "/api/categories/add",
          {
            categoryName: categoryName,
          },
          { headers: { Authorization: token } }
        );
        if (result) {
          toast.success(result.data.msg);
          setLoading(false);
          setCategoryName("");
        }
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
          label="Category Name"
          referenceId="categoryName"
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          handleChange={(e) => setCategoryName(e.target.value)}
        />

        <button
          type="submit"
          className="text-white font-semibold flex justify-center items-center h-9 w-[120px] bg-[#F0841E] text-sm py-2 rounded-[4px]"
        >
          {loading ? <SyncLoader color="#ffffff" size={8} /> : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
