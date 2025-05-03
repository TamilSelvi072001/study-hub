import React from "react";
import HubCard from "./HubCard";
import { useStudyHubContext } from "../Context/StudyHubContext";

const hubs = [
  {
    hubName: "Hivespace",
    location: "232, nfsk, chennai",
    openSeats: 20,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "WorkNest",
    location: "123, abc, bengaluru",
    openSeats: 15,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "FocusPoint",
    location: "456, xyz, delhi",
    openSeats: 10,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "HiveSpace",
    location: "789, pqr, mumbai",
    openSeats: 25,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "Hivespace",
    location: "232, nfsk, chennai",
    openSeats: 20,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "WorkNest",
    location: "123, abc, bengaluru",
    openSeats: 15,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "FocusPoint",
    location: "456, xyz, delhi",
    openSeats: 10,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
  {
    hubName: "HiveSpace",
    location: "789, pqr, mumbai",
    openSeats: 25,
    imageUrl: "https://images.unsplash.com/photo-1616628182509-3d11d79c1e4a",
  },
];

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
