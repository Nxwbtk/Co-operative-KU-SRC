"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TableFiltersProps } from "./types"

interface FilterOption {
    value: string;
    label: string;
  }
  
  interface FilterDropdownProps {
    options?: FilterOption[];  // Make options optional
    value: string | null;
    onValueChange: (value: string | null) => void;
    placeholder: string;
    searchPlaceholder: string;
  }
  
  const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
    options = [],  // Provide default empty array
    value,
    onValueChange,
    placeholder,
    searchPlaceholder
  }) => {
    const [open, setOpen] = React.useState(false);
    
    // Ensure options is always an array
    const safeOptions = Array.isArray(options) ? options : [];
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? safeOptions.find((option) => option?.value === value)?.label ?? placeholder
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
            <CommandGroup>
              {safeOptions.map((option) => (
                <CommandItem
                  key={option?.value ?? ''}
                  value={option?.value ?? ''}
                  onSelect={() => {
                    onValueChange(option?.value === value ? null : option?.value ?? null);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option?.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option?.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

export const TableFilters = ({ allMajor, allStudentClub, onFiltersChange }: TableFiltersProps) => {
  const [majorFilter, setMajorFilter] = React.useState<string | null>(null)
  const [positionFilter, setPositionFilter] = React.useState<string | null>(null)
  const [yearFilter, setYearFilter] = React.useState<string | null>(null)

  // Get unique club positions
  const uniquePositions = React.useMemo(() => {
    const positions = new Set(allStudentClub.map(student => student.clubPosition))
    return Array.from(positions).map(pos => ({
      value: pos,
      label: pos
    }))
  }, [allStudentClub])

  // Get unique academic years
  const uniqueYears = React.useMemo(() => {
    const years = new Set(allStudentClub.map(student => student.academicYear))
    return Array.from(years).map(year => ({
      value: year,
      label: `${Number(year) + 543}`
    })).sort((a, b) => Number(b.value) - Number(a.value))
  }, [allStudentClub])

  // Create major options
  const majorOptions = React.useMemo(() => 
    allMajor.map(major => ({
      value: major._id,
      label: major.name
    }))
  , [allMajor])

  React.useEffect(() => {
    onFiltersChange({
      major: majorFilter,
      position: positionFilter,
      year: yearFilter
    })
  }, [majorFilter, positionFilter, yearFilter, onFiltersChange])

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <FilterDropdown
        options={majorOptions}
        value={majorFilter}
        onValueChange={(value) => setMajorFilter(value)}
        placeholder="กรองตามสาขา"
        searchPlaceholder="ค้นหาสาขา..."
      />
      <FilterDropdown
        options={uniquePositions}
        value={positionFilter}
        onValueChange={setPositionFilter}
        placeholder="กรองตามตำแหน่ง"
        searchPlaceholder="ค้นหาตำแหน่ง..."
      />
      <FilterDropdown
        options={uniqueYears}
        value={yearFilter}
        onValueChange={setYearFilter}
        placeholder="กรองตามปีการศึกษา"
        searchPlaceholder="ค้นหาปีการศึกษา..."
      />
    </div>
  )
}