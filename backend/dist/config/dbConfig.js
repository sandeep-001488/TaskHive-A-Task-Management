"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    dbUrl: process.env.DATABASE_URL ||
        "postgres://user:password@localhost:5432/dbname",
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
};
