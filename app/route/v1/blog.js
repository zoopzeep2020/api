/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const BlogController = require(APP_CONTROLLER_PATH + 'blog');
let blogController = new BlogController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', blogController.getAll);
router.get('/:id', blogController.get);
router.post('/',upload.any(), blogController.create);
router.delete('/:id', blogController.remove);
router.put('/like', blogController.likeBlog);
router.put('/save', blogController.saveBlog);
router.put('/:id',upload.any(), blogController.update);
module.exports = router;