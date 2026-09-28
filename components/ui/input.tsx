import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "cn";

interface LabeledInputProps extends React.ComponentProps<"input"> {
  label?: React.ReactNode;
}

function Input({ className, type, label, ...props }: LabeledInputProps) {
  const inputElement = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full text-start bg-transparent border border-primary/40 rounded-md p-2 text-base md:text-3xl placeholder-primary/50 focus:outline-none focus:border-primary transition-colors",
        className,
      )}
      {...props}
    />
  );

  if (!label) return inputElement;

  return (
    <FieldPrimitive.Root className="flex flex-col space-y-2 w-full">
      <FieldPrimitive.Label className="text-start text-sm md:text-3xl font-semibold tracking-wide text-primary pb-3">
        {label}
      </FieldPrimitive.Label>
      {inputElement}
    </FieldPrimitive.Root>
  );
}

export { Input };
