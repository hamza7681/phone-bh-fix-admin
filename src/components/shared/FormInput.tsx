import { FormInputProps } from "@/types/pagesTypes";
import React, { FC } from "react";

const FormInput: FC<FormInputProps> = ({
  label,
  referenceId,
  type,
  placeholder,
  value,
  handleChange,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={referenceId}
        className="text-[#6453F7] text-sm font-semibold"
      >
        {label}
      </label>
      <input
        className="w-full py-2 px-3 text-gray-500 focus:outline-none border-gray-200 border-[1px] rounded-[4px]"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        id={referenceId}
        name={name}
      />
    </div>
  );
};

export default FormInput;
