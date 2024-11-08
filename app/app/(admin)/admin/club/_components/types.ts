export interface FilterOption {
    value: string;
    label: string;
  }
  
  export interface FilterDropdownProps {
    options: FilterOption[];
    value: string | null;
    onValueChange: (value: string | null) => void;
    placeholder: string;
    searchPlaceholder: string;
  }
  
  export interface TableFiltersProps {
    allMajor: {
      _id: string;
      name: string;
      [key: string]: any;
    }[];
    allStudentClub: {
      _id: string;
      major: string;
      clubPosition: string;
      academicYear: string;
      [key: string]: any;
    }[];
    onFiltersChange: (filters: {
      major: string | null;
      position: string | null;
      year: string | null;
    }) => void;
  }