/**
 * Created by WebrexStudio on 5/8/17.
 */
// const router = require('express').Router();
// const ImageController = require(APP_CONTROLLER_PATH + 'image');
// let imageController = new ImageController();

// router.get('/:url', imageController.get);

// module.exports = router;


//     /**
//  * Created by WebrexStudio on 6/7/17.
//  */
const express = require('express'),
    router = express.Router();
// API V1
router.use('/', require(APP_ROUTE_PATH + 'publicRoute'));

module.exports = router;