import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import linkRouter from "./routers/links";
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.use('/', linkRouter);

const run = async () => {

    await mongoose.connect('mongodb://localhost/link');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));


