export type TSelectScrollOptions = {
  value: string;
  label: string;
};

export type TOptionsGroup = {
  label?: string;
  options: TSelectScrollOptions[];
}

export type TSelectScrollableProps = {
  placeholder: string;
  optionsGroup: TOptionsGroup[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
};
