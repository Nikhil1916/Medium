import React from "react";
import { InputType } from "../utils/interfaces";

const InputComponent = ({label,onChange, placeholder,type="text"}:InputType) => {
  return (
    <div className="flex flex-col gap-2 font-medium text-sm box-border">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="p-2 border border-gray-200 rounded-sm"
      />
    </div>
  );
};

export default InputComponent;
