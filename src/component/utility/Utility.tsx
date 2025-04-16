// src/component/utility/Utility.ts

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]; // "2025-04-16"
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`; // "09:13"
};
