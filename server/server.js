const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const mime = require('mime-types')
path = require('path')
const app = express()
app.use(cors())

const mimeTypes = [
  mime.lookup('.png'),
  mime.lookup('.jpg'),
  mime.lookup('.jpeg'),
  mime.lookup('.gif'),
  mime.lookup('.web')
]

app.use(
  fileUpload({
    createParentPath: true
  })
)

app.use('/uploads', express.static('uploads'))

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  const file = req.files.file

  if (!mimeTypes.includes(file.mimetype)) return res.status(400).json({ message: 'Incorrect input file' })

  const newFile = encodeURI(Date.now() + '-' + file.name)

  file.mv(path.join(__dirname, '../client/public/uploads/') + newFile, err => {
    if (err) {
      return req.status(500).send(err)
    }

    res.json({
      fileName: file.name,
      filePath: `/uploads/${newFile}`
    })
  })
})

app.listen(5000, () => console.log('Server started on 5000...'))
