export { }

const CustomError = require("../helpers/ApiError");
const { commentService } = require("./index");
const serialize = require("../helpers/serialize");
import api from "./api";



const getBooks = async (filter: Object,) => {
  try {
    const query = serialize(filter)
    const res = await api.get(`/books?${query}`)
    const books = res.data.sort((a: any, b: any) => {
      return Date.parse(b.released) - Date.parse(a.released)
    })
    let booksAndComments = [] as any
    for (let i = 0; i < books.length; i++) {
      let book = books[i]
      let bookId = book.url.split("/").pop()
      let { count } = await commentService.fetchComments({ bookId });
      booksAndComments.push({ ...book, count })
    }
    return booksAndComments;
  } catch (error: any) {
    throw new CustomError(error.code || 500, error.message || error || "An error occured");
  }
};

const getBook = async (id: string) => {
  try {
    const res = await api.get(`/books/${id}`)
    let book = res.data
    if (!book) {
      throw new CustomError(404, "Invalid ID passed");
    }
    const comments = await commentService.fetchComments({ id })
    return JSON.parse(JSON.stringify({ book, comments }));
  } catch (error: any) {
    throw new CustomError(error.code || 500, error.message || error);
  }
};


module.exports = {
  getBooks,
  getBook
};
