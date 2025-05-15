import React, { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AppRouter from "../src/appRoutes/AppRoutes";
import { StudyHubProvider } from "./component/Context/StudyHubContext";

// Component that handles redirection on refresh
const RedirectOnRefresh = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isPageRefresh =
      performance.navigation.type === 1 ||
      (
        performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming
      ).type === "reload";

    if (isPageRefresh) {
      navigate("/home", { replace: true });
    }
  }, []);

  return <AppRouter />;
};

export default RedirectOnRefresh;
