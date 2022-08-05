
import { Request, Response } from "express"
const CustomError = require("../helpers/ApiError");
const { characterService } = require("../services");
const catchAsync = require("../helpers/catchAsync");
const pick = require("../helpers/pick");
const allowedSortKeys = ['name', 'gender', 'age']
const allowedSortTypes = ['asc', 'des']


const getCharacters = catchAsync(async function (req: Request, res: Response) {
    const filter = pick(req.query, ["page", "gender"]);
   
    const { sortBy, sortType, } = req.query as any

    if (sortBy && !allowedSortKeys.includes(sortBy)) {
        throw new CustomError(400, "Invalid Sort Parameter passed");
    }

    if (sortType && !allowedSortTypes.includes(sortType)) {
        throw new CustomError(400, "Invalid Sort Type passed");
    }
    const ress = await characterService.getCharacters(JSON.parse(JSON.stringify(filter)));
    const characters = await characterService.handleSort(ress, sortType, sortBy)

    res.status(201).send({
        message: "Characters fetched successfully",
        data: {
            characters
        },
    });
});




module.exports = {
    getCharacters
};