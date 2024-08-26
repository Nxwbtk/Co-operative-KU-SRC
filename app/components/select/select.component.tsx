import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSelectScrollableProps } from "./types";
import { ChevronDown } from "lucide-react";

export function SelectScrollable(props: TSelectScrollableProps) {
  const { placeholder, optionsGroup, onValueChange, defaultValue } = props;
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[213px] rounded-full border border-[#F5B21F]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optionsGroup.map((group, index) => (
          <SelectGroup key={index}>
            {group.label && (
              <SelectLabel key={index}>{group.label}</SelectLabel>
            )}
            {group.options.map((option, i) => (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export function SelectScrollableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-[213px] h-10 rounded-full bg-gray-200 flex items-center px-3">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="ml-auto">
          <div className="">
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
