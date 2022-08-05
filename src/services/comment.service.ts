import { Comment } from "../entity/Comment.entity"
import { AppDataSource } from "../data-source"
const commentRepository = AppDataSource.getRepository(Comment)
const CustomError = require("../helpers/ApiError");

const createComment = async (data: any) => {
  try {
    const comment = await commentRepository.save(data)
    return JSON.parse(JSON.stringify(comment));
  } catch (error: any) {
    throw new CustomError(error.code || 500, error.message || error);
  }
};

const fetchComments = async (criteria = {}, options = {}) => {
  let [comments, count] = await commentRepository.findAndCount({ ...criteria })
  return { comments, count };
};


module.exports = {
  createComment,
  fetchComments,
};
