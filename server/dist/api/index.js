"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const auth_1 = require("./routes/auth");
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.use('/auth', auth_1.authRouter);
