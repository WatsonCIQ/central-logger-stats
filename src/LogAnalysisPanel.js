import React, { useState, useEffect } from "react";
import Summary from "./log-analysis/Summary";

// summary stats
const LogAnalysisPanel = ({ fileData }) => {
  return <Summary fileData={fileData} />;
};

export default LogAnalysisPanel;
