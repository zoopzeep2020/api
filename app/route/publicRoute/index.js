/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const ImageController = require(APP_CONTROLLER_PATH + 'image');
let imageController = new ImageController();

router.get('/:year/:month/:url', imageController.get);

module.exports = router;        