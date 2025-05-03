import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/appRoutes/AppRoutes";
import { StudyHubProvider } from "./component/Context/StudyHubContext";

const App = () => {
  return (
    <StudyHubProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StudyHubProvider>
  );
};

export default App;
