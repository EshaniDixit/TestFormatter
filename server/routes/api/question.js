const router = require('express').Router();
const multer = require('multer');
const ocrSpaceApi = require('ocr-space-api');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB limit

router.post('/upload', upload.single('questionPaper'), async (req, res) => {
    try {
        const { questionText } = await ocrSpaceApi.parseImageFromLocalFile(req.file.path, { apiKey: process.env.OCR_API_KEY });
        console.log(questionText);
        res.send('Question paper uploaded successfully');
    } catch (error) {
        console.error('Error uploading question paper:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;