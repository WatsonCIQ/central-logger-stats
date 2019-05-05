import React, { useState } from "react";
import { formatTime, fileSizeConverter } from "../utils";

const Summary = ({ logSummary }) => {
  return (
    <div>
      <p className="error__text">
        {" "}
        <span role="img" className="log-icon" aria-label="error">
          ❌
        </span>
        errors: {logSummary.errors}
      </p>
      <p className="warning__text">
        {" "}
        <span role="img" className="log-icon" aria-label="warning">
          ⚠
        </span>
        warnings: {logSummary.warnings}
      </p>
      <p className="debug__text">
        {" "}
        <span role="img" className="log-icon" aria-label="debug">
          🐛
        </span>
        debugs: {logSummary.debug}
      </p>
      <p className="log__text">
        {" "}
        <span role="img" className="log-icon" aria-label="log">
          🛠
        </span>
        logs: {logSummary.log}
      </p>
      <p className="">
        {" "}
        <span role="img" className="log-icon" aria-label="log size">
          📈
        </span>
        log size: {fileSizeConverter(logSummary.logSize)}
      </p>
      <p className="">
        {" "}
        ⌛time to load from startup:{" "}
        {formatTime(logSummary.timeElapsedFromStartup)}
      </p>
    </div>
  );
};

export default Summary;
