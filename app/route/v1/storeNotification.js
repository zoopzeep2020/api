/**
 * Created by WebrexStudio on 5/8/17.
 */
const router = require('express').Router();
const StoreNotificationController = require(APP_CONTROLLER_PATH + 'storeNotification');
console.log(APP_CONTROLLER_PATH + 'storeNotification');
let storeNotificationController = new StoreNotificationController();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get('/', storeNotificationController.getStoreNotification);

module.exports = router;
