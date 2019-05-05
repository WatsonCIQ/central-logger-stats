import React, { useState, useEffect } from "react";
import { fileSizeConverter } from "../utils";

const FileDetails = ({ fileDetails }) => {
  return (
    <div className="file-details__panel">
      <h4>{fileDetails.name}</h4>
      <p>created: {fileDetails.lastModifiedDate.toString()}</p>
      <p>size: {fileSizeConverter(fileDetails.size)}</p>
    </div>
  );
};

export default FileDetails;
