import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TSelectScrollableProps } from "./types"

export function SelectScrollable(props: TSelectScrollableProps) {
  const { placeholder, optionsGroup, onValueChange, defaultValue } = props
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[213px] rounded-full border border-[#F5B21F]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optionsGroup.map((group, index) => (
          <SelectGroup key={index}>
            {group.label && <SelectLabel>{group.label}</SelectLabel>}
            {group.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
