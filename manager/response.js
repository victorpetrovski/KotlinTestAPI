const BasicResponse = {
    "success": false,
    "message": "",
    "data": {}
};

class ResponseManager{

    constructor(){

    }

    static getDefaultResponseHandler(res){
        return{
            onSuccess: function (data, message, code) {
                ResponseManager.respondWithSuccess(res,code || 200,data,message);
            },
            onError : function (error) {
                ResponseManager.respondWithError(res,error.status || 500, error.message || "Unknown error");
            },
            onError : function (msg) {
                ResponseManager.respondWithError(res,500,msg);
            }
        };
    }

    static respondWithSuccess(res, code, data, message = "", links = []) {
        let response = Object.assign({}, BasicResponse);
        response.success = true;
        response.message = message;
        response.data = data;
        response.links = links;
        res.status(code).json(response);
    }

    static respondWithError(res, errorCode, message = "", links = []) {
        let response = Object.assign({}, BasicResponse);
        response.success = false;
        response.message = message;
        response.links = links;
        res.status(errorCode).json(response);
    }
}

module.exports = ResponseManager;