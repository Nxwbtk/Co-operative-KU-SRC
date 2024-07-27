import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export type TAlumniProps = {
  name: string;
  type: string;
  major: string;
  img: string;
};

export const AlumniCard = (props: TAlumniProps) => {
  const { name, type, major, img } = props;
  return (
    <Card className="w-[320px] flex flex-col items-center justify-center border-2 border-[#302782]">
      <CardHeader>
        <CardTitle>
          <Image
            src={img}
            width={173}
            height={174}
            alt="profile-img"
            className="rounded border border-[#F5B21F]"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[#302782] pb-4">
        <div className="border border-[#F5B21F] flex flex-col justify-center items-center rounded-md px-2 w-[230px]">
          <h1>{name}</h1>
          <p className="text-sm">{type}</p>
          <p className="text-sm">{major}</p>
        </div>
      </CardContent>
    </Card>
  );
};
