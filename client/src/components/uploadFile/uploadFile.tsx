import { useRef, useState } from 'react'
import React from 'react'
import { UploadedFileType } from '../../types/uploadFile'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'

function UploadFile(): JSX.Element {
  const pickFile = useRef<HTMLInputElement>(null)
  const hostUrl = 'http://localhost:5000/upload'
  const host = 'http://localhost:5000'
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState<UploadedFileType>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.target.files !== null && setSelectedFile(evt.target.files[0])
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select file')
      return
    }

    const formData = new FormData()

    formData.append('file', selectedFile)

    const res = await fetch(hostUrl, {
      method: 'POST',
      body: formData
    })

    const status = await res.status
    const data = await res.json()

    if (status === 400 || status === 500) {
      setErrorMessage(data.message)
      return
    }

    setErrorMessage(null)
    setUploaded(data)
  }

  const handlePick = () => {
    pickFile.current && pickFile.current.click()
  }

  return (
    <div className='flex flex-col items-center p-8'>
      <h1 className='text-3xl font-bold font-display'>Upload Image File</h1>
      <div className='flex border-dashed border-2 border-app-blue rounded-md relative m-8 overflow-hidden'>
        {uploaded && <img className='absolute' alt={uploaded.fileName} src={`${uploaded.filePath}`} width='350' />}
        <button onClick={handlePick} className='p-20 m-8'>
          <PlusOutlined style={{ fontSize: '36px', color: '#08c' }} />
          {selectedFile && <p className='pt-8 font-bold text-app-blue'>{selectedFile.name}</p>}
        </button>
        <input
          className='hidden'
          ref={pickFile}
          type='file'
          onChange={handleChange}
          accept='image/*, .png, .jpg, .gif, .web'
          //multiple
        />
      </div>
      {errorMessage && <h2 className='mb-8 text-xl'>{errorMessage}</h2>}
      {uploaded && <h2 className='mb-8 text-xl'>Uploaded: {uploaded.fileName}</h2>}

      <button
        onClick={handleUpload}
        className='border border-2 rounded-xl w-64 h-16 bg-app-blue text-white font-bold font-display disabled:opacity-25'
        disabled={uploaded !== null}
      >
        Upload file
      </button>
    </div>
  )
}

export default UploadFile
