import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/appRoutes/AppRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
