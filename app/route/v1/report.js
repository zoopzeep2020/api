/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const ReportController = require(APP_CONTROLLER_PATH + 'report');
let reportController = new ReportController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', reportController.getAll);
router.get('/:id', reportController.get);
router.post('/', upload.any(), reportController.create);
router.delete('/:id', reportController.remove);
router.put('/:id', upload.any(), reportController.update);
module.exports = router;