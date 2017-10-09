/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const BlogController = require(APP_CONTROLLER_PATH + 'blog');
let blogController = new BlogController();

router.get('/', blogController.getAll);
router.get('/:id', blogController.get);
router.post('/', blogController.create);
router.delete('/:id', blogController.remove);
router.put('/:id', blogController.update);

module.exports = router;