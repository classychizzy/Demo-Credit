import 'reflect-metadata';
import express from "express";
import bankRoutes from "./routes/bank.routes";
import userRoutes from "./routes/user.routes";



//entry point of the application
const app = express();

app.use(express.json());

app.use("/api/banks", bankRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});