const router = require('express').Router();
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });

// POST /api/questions/upload
router.post('/upload', upload.single('questionPaper'), (req, res) => {
    // Logic to handle file upload
    console.log(req.file); // Contains information about the uploaded file
    res.send('Question paper uploaded successfully');
});

module.exports = router;
