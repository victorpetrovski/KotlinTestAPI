const BaseAutoBindClass = require('../base/autobind-base');
const ResponseManager = require('../manager/response');
const model = global.model = require(APP_MODEL_PATH);
class BaseController extends BaseAutoBindClass{

    constructor(){
        super();

        //prevent creating instances of this class since we are going to use it as Abstract
        if(new.target === BaseController){
            throw new TypeError("Cannot construct BaseController instances directly");
        }
        //Asign the response manager
        this._responseManager = ResponseManager;
    }

    getAll(req, res) {

    }
}

module.exports = BaseController;