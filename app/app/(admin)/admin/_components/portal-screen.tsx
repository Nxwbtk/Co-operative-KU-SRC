import { CardPortal } from "./card-portal";

const PORTAL_CONFIG = [
  {
    title: "สโมสรนิสิต",
    description: "จัดการข้อมูลสโมสรนิสิต",
    url: "/admin/club",
    imageUrl: "https://envi.ku.ac.th/wp-content/uploads/2024/04/12-1024x621.png"
  },
  {
    title: "นิสิตดีเด่น",
    description: "จัดการข้อมูลนิสิต",
    url: "/admin/outstanding-student",
  },
]

export const PortalScreen = () => {
  return (
    <div className="flex flex-col justify-center w-full h-[80vh]">
      <div className="flex flex-row justify-center items-center gap-4">
        {PORTAL_CONFIG.map((config, index) => (
          <CardPortal
            key={index}
            title={config.title}
            description={config.description}
            url={config.url}
            imageUrl={config.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}