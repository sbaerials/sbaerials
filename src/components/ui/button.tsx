import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-mono text-[13px] tracking-[0.08em] uppercase inline-flex items-center justify-center gap-2.5 rounded-sm cursor-pointer border border-transparent transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-blue text-white hover:bg-cloud hover:text-void hover:-translate-y-0.5",
        ghost:
          "border-white/10 text-cloud hover:border-brand-light hover:text-brand-light hover:-translate-y-0.5",
      },
      size: {
        default: "px-7 py-4",
        sm: "px-5 py-2.5 text-[12px]",
        full: "w-full justify-center px-7 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
