const autoBind  = require('auto-bind');

class BaseAutoBindClass{
    constructor(){
        autoBind(this);
    }
}
module.exports = BaseAutoBindClass;
