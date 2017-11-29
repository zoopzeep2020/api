/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const StaticPageController = require(APP_CONTROLLER_PATH + 'staticPage');
let staticPageController = new StaticPageController();

router.get('/', staticPageController.getAll);
router.get('/type/:type', staticPageController.getStaticByType);
router.get('/:id', staticPageController.get);
router.post('/', staticPageController.create);
router.delete('/:id', staticPageController.remove);
router.put('/:id', staticPageController.update);

module.exports = router;