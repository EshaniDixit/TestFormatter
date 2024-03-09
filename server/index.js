const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require('multer');
const { ocrSpace } = require('ocr-space-api-wrapper');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(require('./routes'));

mongoose.connect(process.env.MONGO_URL, {

}).then(() => {
    console.log("DB Connection Successful");
}).catch((err) => {
    console.log(err.message);
});

const connection = mongoose.connection;

let gfs;

connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'PdfFiles',
    });
});

// const storage = new GridFsStorage({
//     url: process.env.MONGO_URL,
//     file: (req, file) => {
//         return {
//             bucketName: 'PdfFiles',
//             filename: file.originalname,
//             metadata: {field: 'file', value: 'file'},
//         };
//     }
// });

const storage = multer.memoryStorage();
const upload = multer({storage});

app.post('/upload', upload.single('file'), (req, res) => {

    const { originalname, buffer } = req.file;
    const writestream = gfs.openUploadStream(originalname, {
        contentType: 'application/pdf',
    });
    writestream.write(buffer);
    writestream.end();
    writestream.on('finish', ()=> {
        res.json({ message: 'PDF File uploaded successfully' });
    })
    //res.json({ message: 'File uploaded successfully'});
})

app.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename
    const readstream = gfs.openDownloadStreamByName(filename)
    // const writestream = fs.createWriteStream(`./${filename}`)
    // readstream.pipe(writestream);
    // try {
    //     const res = await ocrSpace(`./${filename}`, { apiKey: process.env.OCR_KEY });
    //     console.log(res);
    // } catch(error) {
    //     console.log(error);
    // }
    // writestream.on('finish', () => {
    //     console.log('File has been downloaded successfully');
    // })
    let fileBuffer = Buffer.alloc(0);
    readstream.on('data', (chunk)=> {
        fileBuffer = Buffer.concat([fileBuffer, chunk]);
    });
    try {
        const res = await ocrSpace(mongoose.connection.db.fs.files.find(), { apiKey: process.env.OCR_KEY });
        console.log(res);
    } catch(error) {
        console.log(error);
    }
    res.json({ message: 'File downloaded successfully'});
})

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on Port ${process.env.PORT}`);
});