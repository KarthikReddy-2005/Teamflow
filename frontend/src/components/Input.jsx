import React from "react";

const Input = ({
  id,
  label,
  inputType = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        type={inputType}
        id={id}
        autoComplete={id}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200"
        placeholder={placeholder || `Enter ${id}`}
        required
      />
    </div>
  );
};

export default Input;
