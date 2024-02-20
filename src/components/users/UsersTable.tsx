import React, { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { useRouter } from "next/navigation";
// import DeleteConfirmation from "./DeleteConfirmation";
import { userListFireStore } from "@/utils/userListFireStore";

const UsersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { token } = useSelector((s: any) => s.auth);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData: any[] = await userListFireStore("users");
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (token) {
      getUsers();
    }
  }, [token]);

  const actions = (rowData: any) => {
    console.log(rowData);
    return (
      <div className="flex items-center gap-3">
        <div
          onClick={() => {
            setVisible(true);
            setId(rowData.id);
          }}
          className="w-7 h-7 bg-red-500 cursor-pointer justify-center items-center flex rounded-[4px] text-white"
        >
          <FaTrash />
        </div>
      </div>
    );
  };

  const generateCSV = () => {
    const csvData = users.map((x: any) => {
      return {
        userData: x.userData,
      };
    });

    const csvContent = csvData
      .map((row) => {
        return Object.values(row).join(",");
      })
      .join("\n");

    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=UTF-8" });
    const csvURL = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvURL;
    link.download = "users.csv";
    link.click();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/users/delete`,
        { id: id },
        { headers: { Authorization: token } }
      );
      if (res) {
        const filteredUsers = users.filter(
          (x: any) => x.id !== res.data.user._id
        );
        setUsers(filteredUsers);
        setLoading(false);
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <DeleteConfirmation
        visible={visible}
        setVisible={setVisible}
        handleDelete={handleDelete}
        loading={loading}
      /> */}
      <div className="flex md:flex-row md:gap-0 gap-2 flex-col justify-between w-full my-3 border-[1px] border-gray-200 rounded-[4px] p-2">
        <input
          type="text"
          className="focus:outline-none lg:w-[400px] w-full border-[1px] border-gray-200 rounded-[4px] px-3 py-2 "
          placeholder="Search by name"
        />
        <div className="flex items-center gap-3">
          <button
            className="bg-red-500 text-white text-sm px-3 py-2 lg:px-3 lg:py-3 flex items-center justify-center gap-2 rounded-[4px]"
            onClick={() => router.push("/users/user-add")}
          >
            <FaPlus /> Add
          </button>
          <button
            className="bg-green-500 text-white text-sm px-3 py-2 lg:px-3 lg:py-3 flex items-center justify-center gap-2 rounded-[4px]"
            onClick={generateCSV}
          >
            <SiMicrosoftexcel /> Download CSV
          </button>
        </div>
      </div>
      <DataTable
        className="border-[1px] border-gray-200 rounded-[4px] overflow-hidden"
        value={users}
        paginator
        rows={5}
        stripedRows
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="First Name"
          style={{ width: "25%" }}
          body={(rowData: any) => <span>{rowData.firstName}</span>}
        />
        <Column
          header="Email"
          style={{ width: "25%" }}
          body={(rowData: any) => <span>{rowData.email}</span>}
        />
        <Column
          header="Phone"
          style={{ width: "25%" }}
          body={(rowData: any) => <span>{rowData.phone}</span>}
        />
        <Column
          header="Gender"
          style={{ width: "25%" }}
          body={(rowData: any) => <span>{rowData.gender}</span>}
        />
        <Column
          style={{ width: "50%", textAlign: "center" }}
          body={actions}
        ></Column>
      </DataTable>
    </div>
  );
};

export default UsersTable;
