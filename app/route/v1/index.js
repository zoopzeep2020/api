/**
 * Created by crosp on 5/8/17.
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
router.use('/reviewComments', require(ROUTE_V1_PATH + 'reviewComment'));

module.exports = router;