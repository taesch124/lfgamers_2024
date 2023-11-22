"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const api_1 = require("Server/api");
const devMode = process.env.NODE_ENV !== 'production';
const app = (0, express_1.default)();
const PORT = process.env.PORT || '8000';
app.use((0, cors_1.default)());
app.use(api_1.apiRouter);
app.listen(PORT, () => {
    console.log(`Server ready and listening on port ${PORT}`);
});
