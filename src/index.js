import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UploadLogFile from "./UploadLogFile";
import LogAnalysisPanel from "./LogAnalysisPanel";
import "./styles.css";

// parse the log contents and make the log size attribute
const individualLogEntrySize = ({ masterLog }) => {
  const sizeOfMasterLogData = masterLog.map(logEntry => {
    const logString = JSON.stringify(logEntry);
    logEntry.logSize = logString.length;
    return logEntry;
  });
  return sizeOfMasterLogData;
};

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

function App() {
  const [logFiles, setLogFiles] = useState([]);

  const addLogFile = file => {
    // let logs = logFiles;
    // logs.push(file);
    console.log(logFiles);
    setLogFiles([...logFiles, ...[...file]]);
  };

  useEffect(() => {
    console.log("test", logFiles);
  });

  return (
    <div className="App" style={{ textAlign: "left" }}>
      <h1>C.L.A.T</h1>
      <UploadLogFile addLogFile={addLogFile} />
      <div className="logs">
        {logFiles.map((fileData, index) => (
          <LogAnalysisPanel key={index} fileData={fileData} index={index} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
