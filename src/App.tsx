import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/appRoutes/AppRoutes";
import { StudyHubProvider } from "./component/Context/StudyHubContext";
import RedirectOnRefresh from "./RedirectOnRefresh";

const App = () => {
  return (
    <StudyHubProvider>
      <BrowserRouter>
        <RedirectOnRefresh />
      </BrowserRouter>
    </StudyHubProvider>
  );
};

export default App;
