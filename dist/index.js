"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const bank_routes_1 = __importDefault(require("./routes/bank.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const wallet_routes_1 = __importDefault(require("./routes/wallet.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const helmet_1 = __importDefault(require("helmet"));
//entry point of the application
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/banks", bank_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/wallet", wallet_routes_1.default);
app.use("/api/addresses", address_routes_1.default);
app.use("/api/accounts", account_routes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log(`Server running on port ${port}`);
});
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
//# sourceMappingURL=index.js.map