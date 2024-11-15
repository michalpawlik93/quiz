"use client";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

function Button({ label, children, ...props }: PropsWithChildren<ButtonProps>) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-zinc-500"
    >
      {label || children}
    </button>
  );
}

export default Button;
