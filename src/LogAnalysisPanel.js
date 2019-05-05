import React, { useState, useEffect } from "react";
import Summary from "./log-analysis/Summary";
import FileDetails from "./log-analysis/FileDetails";

// summary stats
const LogAnalysisPanel = ({ file }) => {
  const { logSummary, fileDetails, fileData } = file;
  return (
    <div className="log-panel">
      <FileDetails fileDetails={fileDetails} />
      <Summary logSummary={logSummary} />
    </div>
  );
};

export default LogAnalysisPanel;
