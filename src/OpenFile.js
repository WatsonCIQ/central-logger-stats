import React, { useState, useEffect } from "react";

// the file upload button, outputs the contents and saved in state
const handleFiles = (event, saveFileDataInState) => {
  const logFile = event.target.files[0];
  console.log(logFile);

  const reader = new FileReader();

  reader.onload = () => {
    saveFileDataInState(loggerAnalytics(reader.result));
  };
  reader.readAsText(logFile);
};

// parse the log contents and make the log size attribute
const loggerAnalytics = logResult => {
  const log = JSON.parse(logResult);
  const { masterLog } = log;
  const sizeOfMasterLogData = masterLog.map(logEntry => {
    const logString = JSON.stringify(logEntry);
    logEntry.logSize = logString.length;
    return logEntry;
  });
  console.log(sizeOfMasterLogData);
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

const filterLogs = filter => {};

// create stats for the log messages
const summaryStats = logs =>
  logs.reduce(
    (newLogObject, log) => {
      newLogObject.logSize += log.logSize;
      newLogObject.timeElapsedFromStartup = log.timeElapsedFromStartup;
      newLogObject.clientList = createClientListCount(
        newLogObject.clientList,
        log.logClientName
      );

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
      logSize: 0,
      clientList: []
    }
  );

const formatTime = (milliseconds = 0) => {
  const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
  const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
  const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);

  const time = `${hours || 0}:${minutes || 0}:${seconds || 0}`;
  return time;
};

// Main component
const OpenFile = () => {
  const [fileData, setFileData] = useState([]);
  return (
    <div className="log-section">
      <input
        type="file"
        id="fileElem"
        multiple
        onChange={e => handleFiles(e, setFileData)}
      />
      <hr />
      <LogsSummary logData={fileData} />
      <LogList logData={fileData} />
    </div>
  );
};

// summary stats
const LogsSummary = ({ logData }) => {
  const summaryData = summaryStats(logData);
  return (
    <div>
      <p className="error__text">
        {" "}
        <span role="img" className="log-icon" aria-label="error">
          ❌
        </span>
        errors: {summaryData.errors}
      </p>
      <p className="warning__text">
        {" "}
        <span role="img" className="log-icon" aria-label="warning">
          ⚠
        </span>
        warnings: {summaryData.warnings}
      </p>
      <p className="debug__text">
        {" "}
        <span role="img" className="log-icon" aria-label="debug">
          🐛
        </span>
        debugs: {summaryData.debug}
      </p>
      <p className="log__text">
        {" "}
        <span role="img" className="log-icon" aria-label="log">
          🛠
        </span>
        logs: {summaryData.log}
      </p>
      <p className="">
        {" "}
        <span role="img" className="log-icon" aria-label="log size">
          📈
        </span>
        log size: {summaryData.logSize / 1000}KB
      </p>
      <p className="">
        {" "}
        ⌛time to load from startup:{" "}
        {formatTime(summaryData.timeElapsedFromStartup)}
      </p>
      <ul>
        {summaryData.clientList.map(client => (
          <li>
            {client.name}:{client.frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

// list all the log entries
const LogList = ({ logData }) => {
  const [logs, setLogs] = useState([""]);
  const [displayLogs, setDisplayLogs] = useState(true);
  useEffect(() => {
    setLogs(logData);
  }, [logData]);
  return (
    <div>
      <ol>
        {logs.map((log, index) => (
          <li key={index}>{`timestamp: ${log.logTimestamp}`}</li>
        )) || ""}
      </ol>
    </div>
  );
};

export default OpenFile;
