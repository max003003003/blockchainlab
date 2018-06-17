"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_1 = __importDefault(require("request-promise"));
var blockchain_1 = __importDefault(require("../blockchain"));
var bitcoin = new blockchain_1.default();
exports.getBitCoint = function (req, res) {
    res.send(bitcoin);
};
exports.addTransaction = function (req, res) {
    var newTransaction = req.body;
    var blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);
    res.json({
        note: "Transaction will be added in block " + blockIndex,
    });
};
exports.getMine = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var lastBlock, previousBlockHash, currentBlockData, nounce, blockhash, newBlock, requestPromise, requestOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lastBlock = bitcoin.getLastBlock();
                previousBlockHash = lastBlock.hash;
                currentBlockData = {
                    index: lastBlock.index + 1,
                    transactions: bitcoin.pendingTransaction,
                };
                nounce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
                blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nounce);
                newBlock = bitcoin.createNewBlock(nounce, previousBlockHash, blockhash);
                requestPromise = [];
                bitcoin.networkNodes.map(function (networkNodeUrl) {
                    requestPromise.push(request_promise_1.default({
                        body: {
                            newBlock: newBlock,
                        },
                        json: true,
                        method: "POST",
                        uri: networkNodeUrl + "/receive-new-block",
                    }));
                });
                return [4, Promise.all(requestPromise)];
            case 1:
                _a.sent();
                requestOptions = {
                    body: {
                        amount: 12.5,
                        recipient: bitcoin.nodeAddress,
                        sender: "00",
                    },
                    json: true,
                    method: "POST",
                    uri: bitcoin.currentNodeUrl + "/transaction/broadcast",
                };
                return [4, request_promise_1.default(requestOptions)];
            case 2:
                _a.sent();
                res.json({
                    block: newBlock,
                    note: "New block mined successfully",
                });
                return [2];
        }
    });
}); };
exports.registerAndBroadcastNode = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newNodeUrl, regNodesPromise, bulkRegisterOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newNodeUrl = req.body.newNodeUrl;
                if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
                    bitcoin.networkNodes.push(newNodeUrl);
                }
                regNodesPromise = [];
                console.log(newNodeUrl);
                bitcoin.networkNodes.map(function (networkNodeUrl) {
                    var requestOptions = {
                        body: { newNodeUrl: newNodeUrl },
                        json: true,
                        method: "POST",
                        uri: networkNodeUrl + "/register-node",
                    };
                    regNodesPromise.push(request_promise_1.default(requestOptions));
                });
                return [4, Promise.all(regNodesPromise)];
            case 1:
                _a.sent();
                console.log("regist node");
                bulkRegisterOptions = {
                    body: {
                        allnetworkNodes: bitcoin.networkNodes.concat([bitcoin.currentNodeUrl]),
                    },
                    json: true,
                    method: "POST",
                    uri: newNodeUrl + "/register-nodes-bulk",
                };
                return [4, request_promise_1.default(bulkRegisterOptions)];
            case 2:
                _a.sent();
                res.json({
                    note: "New node registered with network successfully.",
                });
                return [2];
        }
    });
}); };
exports.registerNode = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newNodeUrl, nodeNotAlreadyPresent, notCurrentNode;
    return __generator(this, function (_a) {
        newNodeUrl = req.body.newNodeUrl;
        nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
        notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) {
            bitcoin.networkNodes.push(newNodeUrl);
        }
        res.json({
            notes: "New node registered successfully",
        });
        return [2];
    });
}); };
exports.registerNodesBulk = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var allNetworkNodes;
    return __generator(this, function (_a) {
        allNetworkNodes = req.body.allnetworkNodes;
        console.log(allNetworkNodes);
        allNetworkNodes.map(function (networkNodeUrl) {
            var nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1;
            var notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
            if (nodeNotAlreadyPresent && notCurrentNode) {
                bitcoin.networkNodes.push(networkNodeUrl);
            }
        });
        res.json({
            note: "Bulk registration successful.",
        });
        return [2];
    });
}); };
exports.transactionBroadcast = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newTransaction, requestPromise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
                requestPromise = [];
                bitcoin.addTransactionToPendingTransaction(newTransaction);
                bitcoin.networkNodes.map(function (networkNodeUrl) {
                    var requestOptions = {
                        body: newTransaction,
                        json: true,
                        method: "POST",
                        uri: networkNodeUrl + "/transaction",
                    };
                    requestPromise.push(request_promise_1.default(requestOptions));
                });
                return [4, Promise.all(requestPromise)];
            case 1:
                _a.sent();
                res.send({
                    note: "Transaction created and broadcast successfully.",
                });
                return [2];
        }
    });
}); };
exports.recieveNewBlock = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newBlock, lastBlock, correctHash, correctIndex;
    return __generator(this, function (_a) {
        newBlock = req.body.newBlock;
        lastBlock = bitcoin.getLastBlock();
        correctHash = lastBlock.hash === newBlock.previousBlockHash;
        correctIndex = lastBlock.index + 1 === newBlock.index;
        if (correctHash && correctIndex) {
            bitcoin.chain.push(newBlock);
            bitcoin.pendingTransaction = [];
            res.json({
                newBlock: newBlock,
                note: "New block received and accepted",
            });
        }
        else {
            res.json({
                newBlock: newBlock,
                note: "New block rejected",
            });
        }
        return [2];
    });
}); };
exports.registAllNode = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var nodeurls, requestPromise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nodeurls = req.body.nodeurls;
                requestPromise = [];
                nodeurls.map(function (nodeurl) {
                    var requestOptions = {
                        body: {
                            newNodeUrl: nodeurl,
                        },
                        json: true,
                        method: "POST",
                        uri: bitcoin.currentNodeUrl + "/register-add-broadcast-node",
                    };
                    requestPromise.push(request_promise_1.default(requestOptions));
                });
                return [4, Promise.all(requestPromise)];
            case 1:
                _a.sent();
                res.send({
                    note: "Regist all node succesful",
                });
                return [2];
        }
    });
}); };
//# sourceMappingURL=blockchainController.js.map