const router = require('express').Router();
const questionRoutes = require('./question');
const answerKeyRoutes = require('./answerKey');
router.use('/questions', questionRoutes);
router.use('/answerkeys', answerKeyRoutes);
module.exports = router;
