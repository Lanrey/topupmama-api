export { }
const express = require("express");
const validate = require("../helpers/validate");
const { characterController } = require("../controller");

const router = express.Router();

router.get(
  "/",
  characterController.getCharacters
);

module.exports = router;
