import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import OpenFile from "./OpenFile";

import "./styles.css";

function App() {
  const [logFileComponents, setLogFileComponents] = useState([OpenFile]);

  const addLogFileComponent = () => {
    setLogFileComponents([...logFileComponents, OpenFile]);
  };
  return (
    <div className="App" style={{ textAlign: "left" }}>
      <h1>Central Log Stats</h1>
      <div className="add-log__button" onClick={addLogFileComponent}>
        + Add File
      </div>
      <div className="logs">
        {logFileComponents.map((LogReportComponent, index) => (
          <LogReportComponent key={index} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
