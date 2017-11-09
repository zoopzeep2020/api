/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const ServiceController = require(APP_CONTROLLER_PATH + 'service');
let serviceController = new ServiceController();

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.get);
router.post('/', serviceController.create);
router.delete('/:id', serviceController.remove);
router.put('/:id', serviceController.update);
module.exports = router;