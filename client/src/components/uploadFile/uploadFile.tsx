import { useState } from 'react'
import React from 'react'

function UploadFile(): JSX.Element {
  const hostUrl = '/uploads'
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploaded, setUploaded] = useState()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.files)
  }

  const handleUpload = () => {
    console.log(1)
  }

  return (
    <div>
      <input type='file' onChange={handleChange} accept='image/*, .png, .jpg, .gif, .web' />
      <button onClick={handleUpload}>Upload file</button>
    </div>
  )
}

export default UploadFile
