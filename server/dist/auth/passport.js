"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
passport_1.default.use(new passport_local_1.default.Strategy((username, password, done) => {
    console.log("passport local", username, password);
    return done(null, { id: 1, username: 'sam' });
}));
const initialize = () => {
};
exports.initialize = initialize;
