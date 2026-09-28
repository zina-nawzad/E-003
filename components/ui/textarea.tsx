import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cn } from "cn";

interface LabeledTextareaProps extends React.ComponentProps<"textarea"> {
  label?: React.ReactNode;
}

function Textarea({ className, label, ...props }: LabeledTextareaProps) {
  const textareaElement = (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full text-start bg-transparent border border-primary/40 rounded-md  p-2 text-base md:text-3xl placeholder-primary/50 focus:outline-none focus:border-primary transition-colors",
        className,
      )}
      {...props}
    />
  );

  if (!label) return textareaElement;

  return (
    <FieldPrimitive.Root className="flex flex-col space-y-2 w-full">
      <FieldPrimitive.Label className="text-start text-sm md:text-3xl font-semibold tracking-wide text-primary pb-3">
        {label}
      </FieldPrimitive.Label>
      {textareaElement}
    </FieldPrimitive.Root>
  );
}

export { Textarea };
