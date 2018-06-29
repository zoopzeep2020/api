/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const ImageUpload = require(APP_CONTROLLER_PATH + 'imageUpload');
let imageUpload = new ImageUpload();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/', upload.any(), imageUpload.create);
module.exports = router;