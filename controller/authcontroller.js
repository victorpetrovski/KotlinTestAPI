const BaseController = require('./base');
var passport = require('passport');
var jwt = require('jsonwebtoken');

class AuthController extends BaseController {

    constructor() {
        super();
    }

    registerUser(req, res) {

        let responseManager = this._responseManager;

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        //validate the request
        if (!this.isString(username) && !this.isString(password) && !this.isString(email)) {
            return responseManager.getDefaultResponseHandler(res).onError("Fields can't be blank");
        }

        model.user.getUser(req, function (error, user) {
            if (user)
                return responseManager.getDefaultResponseHandler(res).onError("User already Exist");
            else {
                model.user.registerUser(req, function (error, user) {
                    if (!error) {
                        let token = jwt.sign(user.id, config.jwtOptions.jwtSecret);
                        let newUser = user.toJSON();
                        newUser.token = token;
                        return responseManager.getDefaultResponseHandler(res).onSuccess(newUser);
                    } else
                        return responseManager.getDefaultResponseHandler(res).onError(error.message);
                })
            }
        });


    }

    loginUser(req, res) {

        let responseManager = this._responseManager;

        const username = req.body.username;
        const password = req.body.password;

        //validate the request
        if (!this.isString(username) || !this.isString(password)) {
            return responseManager.getDefaultResponseHandler(res).onError("Fields can't be blank");
        }

        model.user.getUser(req, function (error, user) {
            if (user) {
                let token = jwt.sign(user.id, config.jwtOptions.jwtSecret);
                let newUser = user.toJSON();
                newUser.token = token;
                return responseManager.getDefaultResponseHandler(res).onSuccess(newUser);
            } else
                return responseManager.getDefaultResponseHandler(res).onError(error);
        })

    }

    /**
     *
     * Returns true the specified parameters is a string else it returns false
     *
     * @param parameter - the variable we're checking is a String
     * @return {boolean}
     */
    isString(parameter) {
        return parameter != null && (typeof parameter === "string"
            || parameter instanceof String) ? true : false;
    }

}

module.exports = AuthController;