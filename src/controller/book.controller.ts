
import { Request, Response } from "express"
const { bookService, commentService } = require("../services");
const catchAsync = require("../helpers/catchAsync");
const pick = require("../helpers/pick");


const getBooks = catchAsync(async function (req: Request, res: Response) {
    const filter = pick(req.query, ["page"]);
    const books = await bookService.getBooks(JSON.parse(JSON.stringify(filter)));
    res.status(201).send({
        message: "Books fetched successfully",
        data: {
            books,
        },
    });
});

const getBook = catchAsync(async function (req: Request, res: Response) {
    const book = await bookService.getBook(req.params.id);
    const { comments, count } = await commentService.fetchComments({ bookId: req.params.id });
    res.status(201).send({
        message: "Book fetched successfully",
        data: {
            book,
            comments, count
        },
    });
});

module.exports = {
    getBooks,
    getBook
};