import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-foreground hover:brightness-110",
        destructive:
          "bg-destructive text-white focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 border-2 border-foreground hover:brightness-110",
        outline:
          "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 border-2 border-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-foreground hover:brightness-110",
        ghost:
          "border-2 border-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:border-foreground hover:shadow-[2px_2px_0_0_var(--foreground)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      inverse: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Default behavior (inverse=false/undefined): Start UP (shadow), Press DOWN (no shadow)
      {
        inverse: false,
        variant: ["default", "destructive", "outline", "secondary"],
        className:
          "shadow-[4px_4px_0_0_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      },
      // Inverse behavior: Start DOWN (no shadow, translated), Pop UP on hover (shadow)
      {
        inverse: true,
        variant: ["default", "destructive", "outline", "secondary"],
        className:
          "translate-x-[4px] translate-y-[4px] shadow-none hover:translate-x-0 hover:translate-y-0 hover:shadow-[4px_4px_0_0_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
      },
      // Ensure ghost/link don't get these default shadows unless specified (currently excluded from list above)
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      inverse: false,
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  inverse = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    inverse?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, inverse, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
