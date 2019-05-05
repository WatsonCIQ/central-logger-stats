import React, { useState } from "react";
import { formatTime } from "../utils";

const Summary = ({ fileData: logData }) => {
  return (
    <div>
      <p className="error__text">
        {" "}
        <span role="img" className="log-icon" aria-label="error">
          ❌
        </span>
        errors: {logData.errors}
      </p>
      <p className="warning__text">
        {" "}
        <span role="img" className="log-icon" aria-label="warning">
          ⚠
        </span>
        warnings: {logData.warnings}
      </p>
      <p className="debug__text">
        {" "}
        <span role="img" className="log-icon" aria-label="debug">
          🐛
        </span>
        debugs: {logData.debug}
      </p>
      <p className="log__text">
        {" "}
        <span role="img" className="log-icon" aria-label="log">
          🛠
        </span>
        logs: {logData.log}
      </p>
      <p className="">
        {" "}
        <span role="img" className="log-icon" aria-label="log size">
          📈
        </span>
        log size: {logData.logSize / 1000}KB
      </p>
      <p className="">
        {" "}
        ⌛time to load from startup:{" "}
        {formatTime(logData.timeElapsedFromStartup)}
      </p>
    </div>
  );
};

export default Summary;
