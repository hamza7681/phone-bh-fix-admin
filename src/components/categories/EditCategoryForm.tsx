import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import FormInput from "../shared/FormInput";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const EditCategoryForm: FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((s: any) => s.auth);
  const { id } = useParams();

  useEffect(() => {
    const getSingleCategory = async () => {
      try {
        const res = await axios.post(`/api/categories/get-category`, { id });
        if (res) {
          setCategoryName(res.data.category.categoryName);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSingleCategory();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!categoryName || categoryName === "") {
        toast.error("Please enter category name");
        setLoading(false);
      } else {
        const result = await axios.post(
          `/api/categories/edit?id=${id}`,
          {
            categoryName: categoryName,
          },
          { headers: { Authorization: token } }
        );
        if (result) {
          toast.success(result.data.msg);
          setLoading(false);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full p-4 border-[1px] mt-4 border-gray-200 shadow-lg rounded-[4px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormInput
            label="Brand Name"
            referenceId="categoryName"
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            handleChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            type="submit"
            className="text-white font-semibold flex justify-center items-center h-9 w-[140px] bg-[#F0841E] text-sm py-2 rounded-[4px]"
          >
            {loading ? (
              <SyncLoader color="#ffffff" size={8} />
            ) : (
              "Update Category"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCategoryForm;
