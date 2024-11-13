"use client";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="mb-6">
    <label className="block mb-1 text-gray-700">{label}</label>
    <input
      {...props}
      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Input;
