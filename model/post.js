var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var page_limit = 10;


var PostSchema = mongoose.Schema({
    // _id:{
    //     type: String,
    //     getter: function (val) {
    //         return this._id.toString();
    //     },
    //     unique: true
    // },
    postDescription:{
        type : String
    },
    _created_at:{
        type : Date,
        default : Date.now
    },
    _updated_at:{
        type : Date,
        default : Date.now
    },
    createdBy : {type : Schema.Types.String, ref:'_User'}

},{collection: 'Post' , versionKey: false});

PostSchema.pre('update',function (next,done) {
    this._updated_at = Date.now();
    next();
});

var Post = module.exports = mongoose.model("Post",PostSchema);

//Create Post
Post.createPost = function (post,callback) {
    Post.create(post,callback);
};

//Get Posts
Post.getPosts = function (page = 0, callback) {
    Post.find(callback).populate('createdBy','-password').skip(page * page_limit).limit(page_limit);
};
