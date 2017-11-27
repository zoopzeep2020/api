/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const MylistController = require(APP_CONTROLLER_PATH + 'mylist');
let mylistController = new MylistController();

router.get('/', mylistController.getAll);
router.get('/:id', mylistController.get);
router.get('/user/:id', mylistController.getUserMylist);
router.post('/', mylistController.create);
router.delete('/:id', mylistController.remove);
router.put('/:id', mylistController.update);
module.exports = router;