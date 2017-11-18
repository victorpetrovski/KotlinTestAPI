var express = require('express');
var router = express.Router();

const AuthController = require(APP_CONTROLLER_PATH + 'authcontroller');
let authController = new AuthController();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * @api {get} /register Register the user
 * @apiGroup User
 * @apiSuccess {Object[]} users Users list
 * @apiSuccess {Number} users.id User id
 */
router.post('/register',authController.registerUser);



/**
 * @api {get} /login Login the user
 * @apiGroup User
 * @apiSuccess {Object[]} users Users list
 * @apiSuccess {Number} users.id User id
 */
router.post('/login',authController.loginUser);


module.exports = router;