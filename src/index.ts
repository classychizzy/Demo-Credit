import express from "express";
import bankRoutes from "./routes/bank.routes";

const app = express();

app.use(express.json());

app.use("/api/banks", bankRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});