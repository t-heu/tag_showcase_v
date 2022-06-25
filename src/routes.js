const { Router, response } = require('express');
const multer = require('multer');

const createLabelController = require('./app/controller/createLabelController');
const createHubcapTableController = require('./app/controller/createHubcapTableController');

const router = Router();
const upload = multer();

router.get('/', (request, response) => response.render('home', { css: '1', notice_updated_msg: process.env.NOTICE_UPDATED_MSG }));
router.post('/hubcap', upload.array('file', 1000), createHubcapTableController.store);
router.post('/label', upload.array('file', 1000), createLabelController.store);
router.use('*', (req, res, next) => res.redirect('/'));

module.exports = router;
