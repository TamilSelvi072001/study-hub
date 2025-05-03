import React, { createContext, useContext, useState, ReactNode } from "react";

interface HubContextType {
  hubData: any;
  setHubData: (data: any) => void;
}

const StudyHubContext = createContext<HubContextType | undefined>(undefined);

export const StudyHubProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hubData, setHubData] = useState<any>(null);

  return (
    <StudyHubContext.Provider value={{ hubData, setHubData }}>
      {children}
    </StudyHubContext.Provider>
  );
};

export const useStudyHubContext = () => {
  const context = useContext(StudyHubContext);
  if (!context) {
    throw new Error("useHubContext must be used within a HubProvider");
  }
  return context;
};
