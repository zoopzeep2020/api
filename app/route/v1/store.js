/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const StoreController = require(APP_CONTROLLER_PATH + 'store');
let storeController = new StoreController();

router.get('/', storeController.getAll);
router.get('/:id', storeController.get);
router.delete('/:id', storeController.remove);
router.put('/:id', storeController.update);

module.exports = router;