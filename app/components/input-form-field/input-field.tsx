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
            {!isDescription ? (
              <Input
                type={type}
                placeholder={placeholder}
                id={`input-${field.name}`}
                disabled={disabled}
                className={className}
                min={min}
                max={max}
                {...field}
              />
            ) : (
              <Textarea
                id={`input-${field.name}`}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
