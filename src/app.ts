import express, { Application, Request, Response } from 'express'
const app: Application = express();
require("dotenv").config();

const port = process.env.PORT || 4321;
const cors = require("cors");
const bodyParser = require("body-parser");
const { errorConverter, errorHandler } = require("./helpers/error");
const logger = require("./helpers/logger");

app.use(cors("*"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", require("./routes/index"));

app.get("/", (req: Request, res: Response) =>
    res.status(200).send({
        message: "Welcome to my API, you should not be here sha",
    })
);
app.get("*", (req: Request, res: Response) =>
    res.status(404).send({
        message: "Invalid route",
    })
);
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app.listen(port, () => {
    logger.info(`Server started at ${port}`);
});

