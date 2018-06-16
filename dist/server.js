"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorhandler_1 = __importDefault(require("errorhandler"));
var app_1 = __importDefault(require("./app"));
app_1.default.use(errorhandler_1.default());
var port = process.argv[2];
var server = app_1.default.listen(port, function () {
    console.log("App is running at http://localhost:" + port + " ");
});
exports.default = server;
//# sourceMappingURL=server.js.map