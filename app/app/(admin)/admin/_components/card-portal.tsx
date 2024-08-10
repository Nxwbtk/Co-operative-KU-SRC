"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type TCardPortalProps = {
  title: string;
  description: string;
  url: string;
};

export const CardPortal = (props: TCardPortalProps) => {
  const { title, description, url } = props;
  const router = useRouter();
  const handleClick = () => {
    if (url === "") return;
    router.push(url);
  }
  return (
    <Card className="hover:scale-125 transition-transform duration-300 hover:cursor-pointer" onClick={handleClick}>
      <CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        {description}
      </CardContent>
    </Card>
  );
}