import React, { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUploadComponent";
import { Uploader } from "./utils/Uploader";

function App() {
  const [file, setFile] = useState<any>(undefined);
  const [uploader, setUploader] = useState<any>(undefined);
  const [progress, setProgress] = useState(0);
  const [apiBaseUrl, setApiBaseUrl] = useState<string>(
    process.env.REACT_APP_API_BASE_URL ?? ""
  );
  const [apiKey, setApiKey] = useState<string>("");
  const [objectKey, setObjectKey] = useState<string>("");

  const handleApiBaseUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApiBaseUrl(event.target.value);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setFile(files[0]);
    }
  };

  const uploadFile = () => {
    if (file) {
      console.log(file);

      let percentage: any = undefined;

      const videoUploaderOptions = {
        file: file,
        apiBaseUrl: apiBaseUrl,
        apiKey: apiKey,
      };
      const uploader = new Uploader(videoUploaderOptions);
      setUploader(uploader);

      uploader
        .onProgress(({ percentage: newPercentage }: any) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            setProgress(percentage);
            console.log("percentage", `${percentage}%`);
          }
        })
        .onError((error: any) => {
          setFile(undefined);
          console.error(error);
        })
        .onCompleted((newObjectKey: string) => {
          setObjectKey(newObjectKey);
          console.log("newObjectKey", newObjectKey);
        });

      uploader.start();
    }
  };

  const cancelUpload = () => {
    if (uploader) {
      uploader.abort();
    }
    setFile(undefined);
    setObjectKey("");
    setProgress(0);
  };

  return (
    <div className="App">
      <h1>PoC MSInsight - File Upload Form</h1>
      <div className="apiSettings">
        <div className="url">
          <span>API Base URL: </span>
          <input
            type="text"
            value={apiBaseUrl}
            onChange={handleApiBaseUrlChange}
          />
        </div>
        <div className="key">
          <span>API Key: </span>
          <input type="password" value={apiKey} onChange={handleApiKeyChange} />
        </div>
      </div>

      <div className="fileInputs">
        <div className="fileInput">
          <h3 className="title">Normal R1:</h3>
          <div className="uploadProgress">
            <FileUpload
              className="rawInput"
              handleOnselect={handleFileSelect}
            />
            <p>Upload Progress: {progress === 0 ? "" : `${progress} %`}</p>
          </div>
          <label className="objectKey">
            File key in the datalake: {objectKey}
          </label>
        </div>
      </div>
      <div className="controls">
        <button
          disabled={
            file === undefined ||
            progress > 0 ||
            apiBaseUrl === "" ||
            apiKey === ""
          }
          onClick={uploadFile}
        >
          Upload
        </button>
        <button onClick={cancelUpload}>Cancel</button>
      </div>
    </div>
  );
}

export default App;
