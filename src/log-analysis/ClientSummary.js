import React, { useState } from "react";

const LogDetail = ({ clientSummary }) => {
  Object.values(clientSummary).map(item => console.log(item.count));
  return (
    <div>
      {/* {Object.values(clientSummary).map(item => (
        <ul>
          <li>{item.logs}</li>
          <li>{item.count}</li>
          <li>{item.totalLogSize}</li>
          <li>{item.categories}</li>
          <li>{item.logLevel}</li>
          <li>{item.totalTime}</li>
          <li>{item.realTotalTime}</li>
        </ul>
      ))} */}
    </div>
  );
};

export default LogDetail;
