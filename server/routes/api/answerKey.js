const multer = require('multer');
const ocrSpaceApi = require('ocr-space-api');
const router = require('express').Router();

// Define Multer storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name for storing
    }
});

// Initialize Multer with the storage options
const upload = multer({ storage: storage });

// Define the route handler for file upload
router.post('/upload', upload.single('answerKey'), async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    console.log('Request file:', req.file);

    try {
        // Check if req.file is defined
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        console.log('Request received:', req.file); // Log the received file

        // Use the path from req.file
        const { answerKeyText } = await ocrSpaceApi.parseImageFromLocalFile(req.file.path, { apiKey: process.env.OCR_API_KEY });
        console.log('Answer key text:', answerKeyText); // Log the extracted answer key text

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

