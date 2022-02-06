const { Router } = require('express');
const multer = require('multer');

const createHtmlController = require('./app/controller/createHtmlController');

const router = Router();
const upload = multer();

router.get('/', createHtmlController.index);
router.post('/', upload.array('file', 1000), createHtmlController.store);
router.use('*', (req, res, next) => res.redirect('/'));

module.exports = router;
