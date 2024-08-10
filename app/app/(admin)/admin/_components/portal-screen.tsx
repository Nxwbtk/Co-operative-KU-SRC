import { CardPortal } from "./card-portal";

const PORTAL_CONFIG = [
  {
    title: "สโมสรนิสิต",
    description: "จัดการข้อมูลสโมสรนิสิต",
    url: "",
  },
  {
    title: "ศิษย์เก่าดีเด่น",
    description: "จัดการข้อมูลศิษย์เก่าดีเด่น",
    url: "",
  },
]

export const PortalScreen = () => {
  return (
    <div className="flex flex-col justify-center w-full h-screen">
      <div className="flex flex-row justify-center items-center gap-4">
        {PORTAL_CONFIG.map((config, index) => (
          <CardPortal
            key={index}
            title={config.title}
            description={config.description}
            url={config.url}
          />
        ))}
      </div>
    </div>
  );
}