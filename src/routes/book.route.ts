export { }
const express = require("express");
const { bookController } = require("../controller");

const router = express.Router();

router.get(
  "/:id",
  bookController.getBook
);

router.get(
  "/",
  bookController.getBooks
);

module.exports = router;
