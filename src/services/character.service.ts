export { }
const CustomError = require("../helpers/ApiError");
const serialize = require("../helpers/serialize");
import api from "./api";

const getCharacters = async (filter: Object) => {
    try {
        const query = serialize(filter)
        const res = await api.get(`/characters?${query}`)
        return res.data;
    } catch (error: any) {
        throw new CustomError(error.code || 500, error.message || error || "An error occured");
    }
};

const handleSort = async (data: [], sortType: string = 'asc', sortBy: string = 'gender') => {
    try {
        if (sortType === 'asc') {
            return data.sort((a: any, b: any): any => {
                const item1 = a[sortBy];
                const item2 = b[sortBy]
                let comparison = 0;
                if (item1 > item2) {
                    comparison = 1;
                } else if (item1 < item2) {
                    comparison = -1;
                }
                return comparison;
            });
        } else {
            return data.sort((b: any, a: any): any => {
                const item1 = a[sortBy];
                const item2 = b[sortBy]
                let comparison = 0;
                if (item1 > item2) {
                    comparison = 1;
                } else if (item1 < item2) {
                    comparison = -1;
                }
                return comparison;
            });
        }

    } catch (error: any) {
        throw new CustomError(error.code || 500, error.message || error);
    }
};


module.exports = {
    getCharacters,
    handleSort
};
