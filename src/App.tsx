import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/appRoutes/AppRoutes";
import Home from "./component/home/Home";

const App = () => {
  return (
    <BrowserRouter>
      {/* <AppRouter /> */}
      <Home />
    </BrowserRouter>
  );
};

export default App;
// 0e1d35
