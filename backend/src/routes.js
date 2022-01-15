const { Router } = require('express');
const multer = require('multer');

const createHtmlController = require('./app/controller/createHtmlController');

const router = Router();
const upload = multer();

router.post('/', upload.array('file', 1000), createHtmlController.store);
router.use('*', (req, res, next) => res.json({err: 'not found', msg: '404 not found'}));

module.exports = router;
