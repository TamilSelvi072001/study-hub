import React from "react";
import HubCard from "./HubCard";
import { useStudyHubContext } from "../Context/StudyHubContext";

const HubList = () => {
  const { hubData } = useStudyHubContext();
  console.log("Hub Data:", hubData);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4">
      {hubData?.map((hub: any, index: number) => (
        <HubCard key={index} {...hub} />
      ))}
    </div>
  );
};

export default HubList;
