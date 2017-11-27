/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const BookmarkController = require(APP_CONTROLLER_PATH + 'bookmark');
let bookmarkController = new BookmarkController();

router.get('/', bookmarkController.getAll);
router.get('/:id', bookmarkController.get);
router.get('/user/:id', bookmarkController.getUserBookmark);
router.post('/', bookmarkController.create);
router.delete('/:id', bookmarkController.remove);
router.put('/:id', bookmarkController.update);

module.exports = router;