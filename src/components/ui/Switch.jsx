import React from "react";

const Switch = ({ checked, onChange, className }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-10 h-6 bg-gray-400 rounded-full shadow-inner transition-all ${
          checked ? "bg-[#2ECC71]" : ""
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;