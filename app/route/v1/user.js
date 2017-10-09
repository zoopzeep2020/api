/**
 * Created by crosp on 5/8/17.
 */
const router = require('express').Router();
const UserController = require(APP_CONTROLLER_PATH + 'user');
let userController = new UserController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/:id', userController.get);
router.post('/', userController.create);
router.put('/:id', upload.any(), userController.update);
router.post('/admin', userController.createAdmin);
router.get('/admin/adminkey', userController.getAdminKey);

module.exports = router;
