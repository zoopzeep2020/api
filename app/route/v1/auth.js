/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const AuthController = require(APP_CONTROLLER_PATH + 'auth');

let authController = new AuthController();

router.post('/', authController.create);
router.post('/forgot', authController.forgot);    
router.post('/reset/:token', authController.reset);              
router.delete('/:token', authController.remove);

module.exports = router;
