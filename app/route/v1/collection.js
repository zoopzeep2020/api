/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const CollectionController = require(APP_CONTROLLER_PATH + 'collection');
let collectionController = new CollectionController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', collectionController.getAll);
router.get('/:id', collectionController.get);
router.post('/', upload.any(), collectionController.create);
router.delete('/:id', collectionController.remove);
router.put('/:id', upload.any(), collectionController.update);

module.exports = router;