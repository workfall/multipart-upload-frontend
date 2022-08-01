import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUploadComponent';
import { Uploader } from "./utils/Uploader"

function App() {
  const [formData, setFormData] = useState(new FormData());
  const [file, setFile] = useState<any>(undefined)
  const [uploader, setUploader] = useState<any>(undefined)

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      formData.set('file', files[0]);
    }
    setFormData(formData);
  }

  const uploadFile = () => {
    if (file) {
      let percentage: any = undefined

     const videoUploaderOptions = {
        fileName: "foo",
        file: file,
      }
      const uploader = new Uploader(videoUploaderOptions)
      setUploader(uploader)

      uploader
        .onProgress(({ percentage: newPercentage }: any) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage
            console.log(`${percentage}%`)
          }
        })
        .onError((error: any) => {
          setFile(undefined)
          console.error(error)
        })

      uploader.start()
    }
    // try {
    //   Axios({
    //     method: 'POST',
    //     url: 'http://localhost:3001/upload-file',
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     data: formData
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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
      <button onClick={cancelUpload}>Cancel</button>
    </div>
  );
}

export default App;
