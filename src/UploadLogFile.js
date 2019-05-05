import React, { useState, useRef } from "react";

// the file upload button, outputs the contents and saved in state
const handleFiles = async (
  event,
  updateProgressInState,
  saveFileDataInState
) => {
  const logFile = event.target.files;
  // this is for multiful files
  for await (let file of logFile) {
    try {
      // read the file using the file reader API
      const reader = await new FileReader();
      // while the file is being read / opened then do something
      reader.onprogress = e => {
        const { loaded, total } = e;
        updateProgressInState([loaded, total]);
      };
      reader.readAsText(file);
      // once the file has been read then parse the result
      reader.onload = e => {
        const fileInfo = file;
        const fileData = JSON.parse(reader.result);
        saveFileDataInState([fileInfo, fileData]);
      };
    } catch (e) {
      console.log(e);
    }
  }
};

// Main component
const UploadLogFile = ({ addLogFile }) => {
  const [progress, setProgress] = useState([0, 0]);

  // used to reference the input element, used by the fake add file button
  // to activate the file upload dialog
  const inputEl = useRef(null);

  return (
    <div className="log-section">
      <button
        className="add-log__button"
        onClick={() => inputEl.current.click()}
      >
        + Add File
      </button>
      <p>{`percent:${progress[0]} - total:${progress[1]}`}</p>
      <input
        ref={inputEl}
        type="file"
        id="fileElem"
        multiple
        hidden
        onChange={e => handleFiles(e, setProgress, addLogFile)}
      />
    </div>
  );
};

export default UploadLogFile;
/**
 * - open the file and for each send them to an array
 * - sort the array and do the data manipulation needed (context?)
 * - output the summary
 *  - when clicked show the corresponding items
 *  -
 */
