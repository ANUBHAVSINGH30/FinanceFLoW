import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 text-white shadow-sm hover:bg-blue-600",
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
