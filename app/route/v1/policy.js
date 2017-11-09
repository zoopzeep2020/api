/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const PolicyController = require(APP_CONTROLLER_PATH + 'policy');
let policyController = new PolicyController();

router.get('/', policyController.getAll);
router.get('/:id', policyController.get);
router.post('/', policyController.create);
router.delete('/:id', policyController.remove);
router.put('/:id', policyController.update);
module.exports = router;