const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(
  fileUpload({
    createParentPath: true
  })
)

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  const file = req.files.file

  if (!file) return res.json({ message: 'Incorrect input file' })

  const newFile = encodeURI(Date.now() + '-' + file)

  file.mv(`${__dirname}/client/public/uploads/${newFile}`, err => {
    if (err) {
      console.error(err)
      return req.status(500).send(err)
    }
    console.log('File was uploaded')
    res.json({
      fileName: file.name,
      filePath: `/uploads/${newFile}`
    })
  })
})

app.listen(5000, () => console.log('Server started on 5000...'))
