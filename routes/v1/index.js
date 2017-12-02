const express = require('express'), router = express.Router();

const ROUTE_V1_PATH = APP_ROUTE_PATH + "v1/";


router.use('/post', require(ROUTE_V1_PATH + 'posts'));

module.exports = router;