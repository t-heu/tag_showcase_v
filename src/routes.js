const { Router } = require('express');
const multer = require('multer');

const createPriceTagController = require('./app/controller/createPriceTagController');
const createHubcapTableController = require('./app/controller/createHubcapTableController');
const createWMSTagController = require('./app/controller/createWMSTagController');

const router = Router();
const upload = multer();

router.get('/', (_, response) => response.render('home/index.njk', { css: '0', show: process.env.SHOW, notice_updated_msg: process.env.NOTICE_UPDATED_MSG }));
router.post('/tag/price', upload.array('file', 1000), createPriceTagController.store);
router.post('/table/hubcap', upload.array('file', 1000), createHubcapTableController.store);
router.post('/tag/wms', createWMSTagController.store);
router.use('*', (_, res) => res.redirect('/'));

module.exports = router;
