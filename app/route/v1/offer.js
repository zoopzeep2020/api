/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const OfferController = require(APP_CONTROLLER_PATH + 'offer');
let offerController = new OfferController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', offerController.getAll);
router.get('/withfilter', offerController.getAllWithFilter);
router.get('/search', offerController.getOfferBySearch);
router.get('/:id', offerController.get);
router.get('/store/:id', offerController.getStoreOffer);
router.post('/', upload.any(), offerController.create);
router.delete('/:id', offerController.remove);
router.put('/:id', upload.any(), offerController.update);

module.exports = router;