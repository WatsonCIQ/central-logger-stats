import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UploadLogFile from "./UploadLogFile";
import LogAnalysisPanel from "./LogAnalysisPanel";
import "./styles.css";
import logo from "./finsemble.png";

// create a frequency tally of the amount of times the client name is logged
const createClientListCount = (clientList, client) => {
  // if the item exists then add a count, if not then add it in
  const getClient = clientList.find(item => item.name === client);
  if (getClient) {
    return clientList.map(clientListItem => {
      if (clientListItem.name === client) {
        clientListItem.frequency++;
      }
      return clientListItem;
    });
  } else {
    return [...clientList, { name: client, frequency: 1 }];
  }
};

// Main Function
function App() {
  const [logFiles, setLogFiles] = useState([]);

  const addLogFile = file => {
    const [fileDetails, fileData] = file;
    // add size data for each log entry N.B. this is needed for the file summary!
    calulateIndividualLogEntrySize(fileData.masterLog);
    const logSummary = summaryStats(fileData.masterLog);

    const logFile = { fileDetails, logSummary, fileData };

    setLogFiles(prevLogFiles => [...prevLogFiles, logFile]);
  };

  // Add the entry for the file size of each log
  const calulateIndividualLogEntrySize = logs => {
    // by stringifing each enry we can calculate the length which will
    // give the size in bytes
    const sizeOfMasterLogData = logs.map(logEntry => {
      const logString = JSON.stringify(logEntry);
      logEntry.logSize = logString.length;
      return logEntry;
    });
    return sizeOfMasterLogData;
  };

  // create stats for the log messages
  const summaryStats = logs =>
    logs.reduce(
      (newLogObject, log) => {
        newLogObject.logSize += log.logSize;
        newLogObject.timeElapsedFromStartup = log.timeElapsedFromStartup;
        // newLogObject.clientList = createClientListCount(
        //   newLogObject.clientList,
        //   log.logClientName
        // );

        switch (log.logType) {
          case "Log":
            newLogObject.log++;
            break;
          case "Debug":
            newLogObject.debug++;
            break;
          case "Warn":
            newLogObject.warnings++;
            break;
          case "Error":
            newLogObject.errors++;
            break;
          default:
        }

        return newLogObject;
      },
      {
        errors: 0,
        warnings: 0,
        debug: 0,
        log: 0,
        logSize: 0
      }
    );

  useEffect(() => {
    console.log("test", logFiles);
  });

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <div className="header">
        <UploadLogFile addLogFile={addLogFile} />
        <div className="logo">
          <h1>
            <img src={logo} />
            C.L.A.S
          </h1>
          <p>Central Logger Analytics Suite</p>
        </div>
      </div>
      <div className="logs">
        {logFiles.map((file, index) => (
          <LogAnalysisPanel key={index} file={file} index={index} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
