import { useCallback, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage]: any = useState(null)
  const [textResult, setTextResult] = useState("")

  const worker = createWorker()

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return
    await worker.load()
    await worker.loadLanguage("eng+tha")
    await worker.initialize("eng+tha")
    const { data } = await worker.recognize(selectedImage)
    setTextResult(data.text)
    console.log(data.text)
  }, [worker, selectedImage])

  useEffect(() => {
    convertImageToText()
  }, [selectedImage, convertImageToText])

  const handleChangeImage = (e: any) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    } else {
      setSelectedImage(null)
      setTextResult("")
    }
  }

  return (
    <div className="App">
      <h1>Image to Text</h1>
      <p>Get word in image</p>
      <div className='input-wrapper'>
        <label htmlFor='upload'>Upload Image</label>
        <input type='file' id="upload" accept='image/*' onChange={handleChangeImage} />
      </div>

      <div className='result'>
        {selectedImage && (
          <div className='box-image'>
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </div>
        )}
      </div>
      {textResult && (
        <div className='box-p'>
          <p>{textResult}</p>
        </div>
      )}
    </div>
  )
}

export default App
