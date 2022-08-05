
import { Request, Response } from "express"
const { commentService } = require("../services");
const catchAsync = require("../helpers/catchAsync");
var requestIp = require("request-ip");


const createComment = catchAsync(async function (req: Request, res: Response) {
    const ipAddress = requestIp.getClientIp(req);
    const comment = await commentService.createComment({ ...req.body, ipAddress });
    res.status(201).send({
        message: "Comment created successfully",
        data: {
            comment,
        },
    });
});
module.exports = {
    createComment
};