import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#E5E5E5] bg-white ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return <div className={`p-4 pb-2 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={`p-4 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`text-base font-semibold tracking-tight text-slate-950 ${className}`}
      {...props}
    />
  );
}
