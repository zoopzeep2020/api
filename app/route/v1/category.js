/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const CategoryController = require(APP_CONTROLLER_PATH + 'category');
let categoryController = new CategoryController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.get);
router.post('/', upload.any(), categoryController.create);
router.delete('/:id', categoryController.remove);
router.put('/:id', upload.any(), categoryController.update);

module.exports = router;