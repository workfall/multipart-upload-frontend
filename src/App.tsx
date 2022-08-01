import Axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUploadComponent';

function App() {
  const [formData, setFormData] = useState(new FormData());

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      formData.set('file', files[0]);
    }
    setFormData(formData);
  }

  const uploadFile = () => {
    try {
      Axios({
        method: 'POST',
        url: 'http://localhost:3001/upload-file',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Simple File Upload Form</h1>
      <FileUpload handleOnselect={handleFileSelect} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default App;
