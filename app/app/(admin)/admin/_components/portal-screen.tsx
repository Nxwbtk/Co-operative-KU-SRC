import { TPayloadDashboard } from "../types";
import { CardAmountDashboard } from "./card-portal";
import { TableDetailDashboard } from "./table-detail-dashboard";
import { TableMajorDetailDashboard } from "./table-major";

const PORTAL_CONFIG = [
  {
    title: "สโมสรนิสิต",
    description: "จัดการข้อมูลสโมสรนิสิต",
    url: "/admin/club",
    imageUrl:
      "https://envi.ku.ac.th/wp-content/uploads/2024/04/12-1024x621.png",
  },
  {
    title: "นิสิตดีเด่น",
    description: "จัดการข้อมูลนิสิต",
    url: "/admin/outstanding-student",
  },
];

export const PortalScreen = (props: TPayloadDashboard) => {
  const { amountData, majorsData, awardsData } = props;
  let majorEdit = amountData.find((data) => data.title === "จำนวนสาขาวิชา");
  if (majorEdit) {
    majorEdit.amount =
      majorEdit.amount -
      (majorsData.find((data) => data.name === "อื่นๆ") ? 1 : 0);
  }
  let awardEdit = amountData.find((data) => data.title === "จำนวนประเภทรางวัล");
  if (awardEdit) {
    awardEdit.amount =
      awardEdit.amount -
      (awardsData.find((data) => data.name === "ด้านใหม่") ? 1 : 0);
  }
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {amountData.map((data, index) => (
            <CardAmountDashboard
              key={index}
              title={data.title}
              amount={data.amount}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <div className="w-full">
            <TableMajorDetailDashboard data={majorsData} />
          </div>
          <div className="w-full">
            <TableDetailDashboard mode="award" data={awardsData} />
          </div>
        </div>
      </div>
    </>
  );
};
