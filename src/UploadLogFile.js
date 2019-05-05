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

      // once the file has been read then parse the result
      reader.onload = async e => {
        const fileInfo = await file;
        const fileData = await JSON.parse(reader.result);
        // function to save the file data in the parent component (lift the state)
        await saveFileDataInState([fileInfo, fileData]);
      };

      reader.readAsText(file);
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

  const uploadProgress = () => {
    const [currentLoadedBytes, totalFileSize] = progress;
    if (currentLoadedBytes === 0) {
      return "";
    } else if (currentLoadedBytes !== totalFileSize) {
      return (
        <p>{`File progress: ${(progress[0] / progress[1]) * 100 || 0} %`}</p>
      );
    } else if (currentLoadedBytes === totalFileSize) {
      return (
        <p style={{ opacity: 0.4, fontSize: "10px" }}>✔ upload successful</p>
      );
    }
  };

  return (
    <div className="upload__section">
      <button
        className="add-log__button"
        onClick={() => inputEl.current.click()}
      >
        + Add File
      </button>
      {}

      <input
        ref={inputEl}
        type="file"
        id="fileElem"
        multiple
        hidden
        onChange={e => handleFiles(e, setProgress, addLogFile)}
      />
      {uploadProgress()}
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
