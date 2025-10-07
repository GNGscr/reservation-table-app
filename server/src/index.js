import express from "express";
import cors from 'cors';
import productsRouter from './routes/products.js';

const app = express();
// const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);


app.get("/api/products", (req, res) => {
    res.json({ msg: "Hello from the server" });
  });

// app.listen(PORT, () => {
//     console.log(`Server is listening on http://localhost:${PORT}`);
// });