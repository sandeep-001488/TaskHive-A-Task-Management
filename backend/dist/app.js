"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const app = (0, express_1.default)();
const corsOptions = {
    origin: "https://taskhive-manage-your-tasks.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({ message: "TaskHive API is running" });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/todos", todoRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.listen(5000, () => {
    console.log(`Server runnning on port 5000`);
});
