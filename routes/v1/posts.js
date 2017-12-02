var express = require('express');
var router = express.Router();

const PostController = require(APP_CONTROLLER_PATH + 'post');
let postController = new PostController();

router.get('/',postController.getPosts);

router.post('/',postController.createPost);

module.exports = router;