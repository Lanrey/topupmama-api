export { }
const express = require("express");
const validate = require("../helpers/validate");
const { commentController } = require("../controller");
const commentValidation = require("../policies/comment.policy");

const router = express.Router();

router.post(
  "/create", [validate(commentValidation.createComment)],
  commentController.createComment
);


module.exports = router;
