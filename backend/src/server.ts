import express from "express";
import cors from "cors";
import {env} from "./config/env.js"
import routes from "./routes/index.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "FinanecFloW is running."
    });
});

app.use("/api", routes)

app.use(errorMiddleware);

app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});