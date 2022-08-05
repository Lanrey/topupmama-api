const Joi = require("@hapi/joi");

const createComment = {
  body: Joi.object().keys({
    text: Joi.string().max(500).required().messages({
      "string.empty": `Comment Text cannot be an empty field`,
      "string.max": `Comment Text cannot be more than {#limit}`,
      "any.required": `Comment Text is a required field`,
    }),
  }),
};

module.exports = {
  createComment,
};
