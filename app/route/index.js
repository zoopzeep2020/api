    /**
 * Created by WebrexStudio on 6/7/17.
 */
const express = require('express'),
    router = express.Router();
// API V1
router.use('/', require(APP_ROUTE_PATH + 'v1'));

module.exports = router;