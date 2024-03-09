const multer = require('multer');
const ocrSpaceApi = require('ocr-space-api');
const router = require('express').Router();

const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('answerKey'), async (req, res) => {
    try {
        const { answerKeyText } = await ocrSpaceApi.parseImageFromLocalFile(req.file.path, { apiKey: process.env.OCR_API_KEY });
        console.log(answerKeyText);
        const userResponse = req.query.response; 
        if (userResponse === answerKeyText) {
            res.send('Response is correct!');
        } else {
            res.send('Response is incorrect. Please try again.');
        }
    } catch (error) {
        console.error('Error uploading answer key:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
