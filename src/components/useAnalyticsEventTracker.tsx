// useAnalyticsEventTracker.jsx

import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="SwapToken category") => {
  const eventTracker = (action = "Swap Action", label = "Swap label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;