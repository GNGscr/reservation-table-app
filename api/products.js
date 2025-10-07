import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import productsRouter from "../server/src/routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);

export const handler = serverless(app);
