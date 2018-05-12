/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const StoreController = require(APP_CONTROLLER_PATH + 'store');
let storeController = new StoreController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/rendom', upload.any(), storeController.rendom);
router.get('/', storeController.getAll);
router.get('/trendingStore', storeController.getTrendingStore);
router.get('/search', storeController.getStoreBySearch);
router.get('/bookmarkbyuser', storeController.bookmarkByUser);
router.get('/:id', storeController.get);
router.delete('/:id', storeController.remove);
router.put('/bookmark', storeController.bookmarkStore);
router.put('/:id', upload.any(), storeController.update);

module.exports = router;