
const BaseController = require('./base');
let responseManager;

class PostController extends BaseController{

    constructor(){
        super();
        responseManager = this._responseManager;
    }


    getPosts(req,res){
        model.post.getPosts(0,function (error,data) {
           if(error)
               responseManager.getDefaultResponseHandler(res).onError(error);
           else
               responseManager.getDefaultResponseHandler(res).onSuccess(data);
        });
    }

    createPost(req,res,next){
        req.body.createdBy = req.user;
        model.post.createPost(req.body,function (error,data) {
            if(error)
                responseManager.getDefaultResponseHandler(res).onError(error);
            else
                responseManager.getDefaultResponseHandler(res).onSuccess(data);
        })
    }

}

module.exports = PostController;