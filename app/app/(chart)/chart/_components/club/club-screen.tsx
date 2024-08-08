import { ClubCard } from "./club-card";

export const ClubScreen = () => {
  
  return (
    <div className="flex flex-col items-center pt-4 gap-4 pb-4">
      <ClubCard />
      <div className="flex flex-row gap-4 justify-between">
        <ClubCard />
        <ClubCard />
        <ClubCard />
      </div>
    </div>
  );
};
