import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export type TInputFormFieldProps<T extends FieldValues, P extends Path<T>> = {
  form: UseFormReturn<T>;
  name: P;
  label: string;
  placeholder: string;
  className?: string;
  type?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
  isDescription?: boolean;
};

export const InputFormField = <T extends FieldValues, P extends Path<T>>(
  props: TInputFormFieldProps<T, P>
) => {
  const {
    form,
    name,
    label,
    placeholder,
    className,
    type = "text",
    disabled = false,
    min,
    max,
    required = false,
    isDescription = false,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 w-full">
          <FormLabel
            htmlFor={`input-${field.name}`}
            className="font-bold text-sm"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={type === "password" ? (isVisible ? "text" : "password") : type}
                placeholder={placeholder}
                id={`input-${field.name}`}
                className="pr-10"
                {...field}
              />
              {type === "password" && <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </Button>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
