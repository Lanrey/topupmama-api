import { NextFunction, Request, Response } from 'express'
const Joi = require("@hapi/joi");
const CustomApiError = require("../helpers/ApiError");
const pickUtil = require("../helpers/pick");

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pickUtil(schema, ["params", "query", "body", "headers"]);
  const object = pickUtil(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details: any) => details.message)
      .join(", ");
    return next(new CustomApiError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
