"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUtil = void 0;
exports.responseUtil = {
    sendSuccess: (res, message, data = null) => {
        res.status(200).json({ message, data });
    },
    sendError: (res, error) => {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    },
};
