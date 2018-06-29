/**
 * Created by WebrexStudio on 5/8/17.
 */
const express = require('express'),

    router = express.Router();
const ROUTE_V1_PATH = APP_ROUTE_PATH + "v1/";
router.use('/auth', require(ROUTE_V1_PATH + 'auth'));
router.use('/users', require(ROUTE_V1_PATH + 'user'));
router.use('/categories', require(ROUTE_V1_PATH + 'category'));
router.use('/stores', require(ROUTE_V1_PATH + 'store'));
router.use('/keywords', require(ROUTE_V1_PATH + 'keyword'));
router.use('/catalogs', require(ROUTE_V1_PATH + 'catalog'));
router.use('/offers', require(ROUTE_V1_PATH + 'offer'));
router.use('/reviews', require(ROUTE_V1_PATH + 'review'));
router.use('/bookmarks', require(ROUTE_V1_PATH + 'bookmark'));
router.use('/blogs', require(ROUTE_V1_PATH + 'blog'));
router.use('/mylists', require(ROUTE_V1_PATH + 'mylist'));
router.use('/reviewComments', require(ROUTE_V1_PATH + 'reviewComment'));
router.use('/collections', require(ROUTE_V1_PATH + 'collection'));
router.use('/reports', require(ROUTE_V1_PATH + 'report'));
router.use('/feedbacks', require(ROUTE_V1_PATH + 'feedback'));
router.use('/cities', require(ROUTE_V1_PATH + 'city'));
router.use('/homes', require(ROUTE_V1_PATH + 'home'));
router.use('/staticPages', require(ROUTE_V1_PATH + 'staticPage'));
router.use('/storeNotifications', require(ROUTE_V1_PATH + 'storeNotification'));
router.use('/userNotifications', require(ROUTE_V1_PATH + 'userNotification'));
router.use('/imageupload', require(ROUTE_V1_PATH + 'imageUpload'));


module.exports = router;