"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TCardPortalProps = {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
};

export const CardPortal = (props: TCardPortalProps) => {
  const { title, description, url, imageUrl } = props;
  const router = useRouter();
  const handleClick = () => {
    if (url === "") return;
    router.push(url);
  }
  return (
    <Card className="hover:scale-125 transition-transform duration-300 hover:cursor-pointer" onClick={handleClick}>
      <Image
        src={imageUrl ?? "https://www.src.ku.ac.th/en/tp/img/banner1.jpg"}
        width={300}
        height={200}
        alt={""}
      />
      <CardContent className="flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        {description}
      </CardContent>
    </Card>
  );
}