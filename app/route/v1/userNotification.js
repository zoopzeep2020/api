/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const UserNotificationController = require(APP_CONTROLLER_PATH + 'userNotification');
console.log(APP_CONTROLLER_PATH + 'userNotification');
let userNotificationController = new UserNotificationController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', userNotificationController.getUserNotification);

module.exports = router;
