"use client";

import { FormLabel } from "@/components/ui/form";
import { forwardRef } from "react";
import { AppFormLabelProps } from "./types";

/**
 * App Form Label
 * This component is used to create a label for a form input
 *
 * Props:
 * @param label: string | ReactNode - The label to display or a Element
 * @example
 * label="name"
 * label={<span>name</span>}
 * @param required: boolean - If the input is required
 * @default false
 * @example
 * label="name" required
 *
 *
 * @component
 */

export const AppFormLabel = forwardRef(function AppFormLabel(
  props: AppFormLabelProps,
  ref: React.Ref<HTMLLabelElement>
) {
  const { label, required, ...rest } = props;

  return (
    <FormLabel ref={ref} {...rest}>
      {label}
      {required && <span className="inline-block text-red-500 ms-1">*</span>}
    </FormLabel>
  );
});
