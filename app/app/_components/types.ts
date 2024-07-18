import { StaticImageData } from "next/image";

export type TLayoutConfig = {
  title: string;
  isFixColor: boolean;
  url: string;
  icon: any;
};

export type TopicMenuProps = {
  menus: TLayoutConfig[];
};

export type TInformationChildConfig = {
  title: string;
  url: string;
  icon: StaticImageData | null;
}

export type TInformationParentConfig = {
  title: string;
  url: string;
  isParent: boolean;
  children: TInformationChildConfig[];
}

export type TInformationConfig = {
  title: string;
  isButtonOnly: boolean;
  url?: string;
  parentConfig: TInformationParentConfig[];
}