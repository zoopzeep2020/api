/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const CatalogController = require(APP_CONTROLLER_PATH + 'catalog');
let catalogController = new CatalogController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', catalogController.getAll);
router.get('/featurecatalog', catalogController.getFeatureCatalog);
router.get('/search', catalogController.getCatalogBySearch);

router.get('/:id', catalogController.get);
router.post('/', upload.any(), catalogController.create);
router.delete('/:id', catalogController.remove);
router.put('/:id', upload.any(), catalogController.update);
router.get('/store/:storeId', catalogController.getStoreCatalog);
module.exports = router;