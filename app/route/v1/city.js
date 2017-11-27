/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const CityController = require(APP_CONTROLLER_PATH + 'city');
let cityController = new CityController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', cityController.getAll);
router.get('/searchByWord', cityController.getSearchByWord);
router.get('/searchByLongLat', cityController.getSearchByLongLat);
router.get('/:id', cityController.get);
router.post('/', upload.any(), cityController.create);
router.delete('/:id', cityController.remove);
router.put('/:id', upload.any(), cityController.update);
module.exports = router;