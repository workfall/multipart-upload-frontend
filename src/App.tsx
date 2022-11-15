import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUploadComponent';
import { Uploader } from "./utils/Uploader"

function App() {
  const [file, setFile] = useState<any>(undefined)
  const [uploader, setUploader] = useState<any>(undefined)
  const [progress, setProgress] = useState(0)

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setFile(files[0])
    }
  }

  const uploadFile = () => {
    if (file) {
      console.log(file);
      
      let percentage: any = undefined

     const videoUploaderOptions = {
        fileName: file.name,
        file: file,
      }
      const uploader = new Uploader(videoUploaderOptions)
      setUploader(uploader)

      uploader
        .onProgress(({ percentage: newPercentage }: any) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage
            setProgress(percentage)
            console.log('percentage', `${percentage}%`)
          }
        })
        .onError((error: any) => {
          setFile(undefined)
          console.error(error)
        })

      uploader.start()
    }
  }

  const cancelUpload = () => {
    if (uploader) {
      uploader.abort()
      setFile(undefined)
    }
  }

  return (
    <div className="App">
      <h1>Simple File Upload Form</h1>
      <FileUpload handleOnselect={handleFileSelect} />
      <button onClick={uploadFile}>Upload</button>
      <br />
      <p>Progress: {progress} %</p>
      <br />
      <button onClick={cancelUpload}>Cancel</button>
    </div>
  );
}

export default App;
