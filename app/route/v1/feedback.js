/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const FeedbackController = require(APP_CONTROLLER_PATH + 'feedback');
let feedbackController = new FeedbackController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', feedbackController.getAll);
router.get('/:id', feedbackController.get);
router.post('/', upload.any(), feedbackController.create);
router.delete('/:id', feedbackController.remove);
router.put('/:id', upload.any(), feedbackController.update);
module.exports = router;