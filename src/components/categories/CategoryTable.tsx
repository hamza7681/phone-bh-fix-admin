import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { useRouter } from "next/navigation";
// import DeleteConfirmation from "../brands/DeleteConfirmation";

const CategoryTable: FC = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((s: any) => s.auth);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.post("/api/categories/get-list", { temp: "" });
        if (res) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getCategories();
    }
  }, [token]);

  const categoryName = (rowData: any) => {
    return <span>{rowData.categoryName}</span>;
  };

  const actions = (rowData: any) => {
    return (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-blue-500 cursor-pointer justify-center items-center flex rounded-[4px] text-white">
          <FaPen />
        </div>
        <div
          onClick={() => {
            setVisible(true);
            setId(rowData._id);
          }}
          className="w-7 h-7 bg-red-500 cursor-pointer justify-center items-center flex rounded-[4px] text-white"
        >
          <FaTrash />
        </div>
      </div>
    );
  };

  const generateCSV = () => {
    const csvData = categories.map((category: any) => {
      return {
        srNo: category.srNo,
        brandName: category.brandName,
      };
    });

    return (
      <div>
        {/* <DeleteConfirmation */}
        {/* // visible={visible} */}
        {/* // setVisible={setVisible} */}
        {/* // handleDelete={handleDelete} */}
        {/* // loading={loading} */}
        {/* // /> */}
        <div className="flex justify-between w-full my-3 border-[1px] border-gray-200 rounded-[4px] p-2">
          <input
            type="text"
            className="focus:outline-none lg:w-[400px] w-[200px] border-[1px] border-gray-200 rounded-[4px] px-3 py-2 "
            placeholder="Search by name"
          />
          <div className="flex items-center gap-3">
            <button
              className="bg-red-500 text-white text-sm px-3 py-3 flex items-center justify-center gap-2 rounded-[4px]"
              onClick={() => router.push("/brands/brand-add")}
            >
              <FaPlus /> Add
            </button>
            <button
              className="bg-green-500 text-white text-sm px-3 py-3 flex items-center justify-center gap-2 rounded-[4px]"
              onClick={generateCSV}
            >
              <SiMicrosoftexcel /> Download CSV
            </button>
          </div>
        </div>
        <DataTable
          className="border-[1px] border-gray-200 rounded-[4px] overflow-hidden"
          value={categories}
          paginator
          rows={5}
          stripedRows
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            header="Brand Name"
            style={{ width: "33%" }}
            body={categoryName}
          ></Column>
          <Column style={{ width: "34%" }} body={actions}></Column>
        </DataTable>
      </div>
    );
  };
};

export default CategoryTable;
