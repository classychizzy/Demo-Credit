import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import 'reflect-metadata';
import express from "express";
import bankRoutes from "./routes/bank.routes";
import userRoutes from "./routes/user.routes";
import walletRoutes from "./routes/wallet.routes";
import addressRoutes from "./routes/address.routes";
import accountRoutes from "./routes/account.routes";
import pinRoutes from "./routes/pin.routes";
import kycRoutes from "./routes/kyc.routes";
import helmet from 'helmet';





//entry point of the application
const app = express();

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));


app.use("/api/banks", bankRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/pin", pinRoutes);
app.use("/api/kyc", kycRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log(`Server running on port ${port}`);
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});