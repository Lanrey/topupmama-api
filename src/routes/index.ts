import express from 'express'
const router = express.Router();

const commentRouter = require("./comment.route");
const bookRouter = require("./book.route");
const characterRouter = require("./character.route");
router.use("/comment", commentRouter);
router.use("/books", bookRouter);
router.use("/characters", characterRouter);
module.exports = router;
