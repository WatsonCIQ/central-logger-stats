import React, { useState, useEffect } from "react";
import Summary from "./log-analysis/Summary";
import FileDetails from "./log-analysis/FileDetails";
import ClientSummary from "./log-analysis/ClientSummary";

// summary stats
const LogAnalysisPanel = ({ file }) => {
  const { logSummary, fileDetails, fileData, clientSummary } = file;
  return (
    <div className="log-panel">
      <FileDetails fileDetails={fileDetails} />
      <Summary logSummary={logSummary} />
      <ClientSummary clientSummary={clientSummary} />
    </div>
  );
};

export default LogAnalysisPanel;
