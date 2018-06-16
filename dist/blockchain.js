"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var uuid_1 = __importDefault(require("uuid"));
var Block_1 = __importDefault(require("./models/Block"));
var Transaction_1 = __importDefault(require("./models/Transaction"));
var currentNodeUrl = process.argv[3];
var Blockchain = (function () {
    function Blockchain() {
        this.chain = [];
        this.pendingTransaction = [];
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];
        this.createNewBlock(100, "0", "0");
        this.nodeAddress = uuid_1.default().split("-").join("");
    }
    Blockchain.prototype.createNewBlock = function (nouce, previousBlockHash, hash) {
        var newBlock = new Block_1.default(this.chain.length + 1, Date.now(), this.pendingTransaction, nouce, hash, previousBlockHash);
        this.pendingTransaction = [];
        this.chain.push(newBlock);
        return newBlock;
    };
    Blockchain.prototype.getLastBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
        var newTransaction = new Transaction_1.default(amount, sender, recipient, uuid_1.default().split("-").join(""));
        return newTransaction;
    };
    Blockchain.prototype.addTransactionToPendingTransaction = function (transaction) {
        this.pendingTransaction.push(transaction);
        return this.getLastBlock().index + 1;
    };
    Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
        var dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        var hash = crypto_js_1.default.SHA256(dataAsString).toString();
        return hash;
    };
    Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
        var nouce = 0;
        var hash = this.hashBlock(previousBlockHash, currentBlockData, nouce);
        while (hash.substring(0, 4) !== "0000") {
            nouce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nouce);
        }
        return nouce;
    };
    Blockchain.prototype.chainIsValid = function (blockchain) {
        var validChain = true;
        for (var i = 1; i < blockchain.chain.length; i++) {
            var currentBlock = blockchain.chain[i];
            var prevBlock = blockchain.chain[i - 1];
            var blockHash = this.hashBlock(prevBlock.hash, {
                index: currentBlock.index,
                transactions: currentBlock.transactions,
            }, currentBlock.nouce);
            if (blockHash.substring(0, 4) !== "0000") {
                validChain = false;
            }
            else if (currentBlock.previousBlockHash !== prevBlock.hash) {
                validChain = false;
            }
        }
        var genesisBlock = blockchain.chain[0];
        var correctNouce = genesisBlock.nouce === 100;
        var correctPreviousBlockHash = genesisBlock.previousBlockHash === "0";
        var correctHash = genesisBlock.hash === "0";
        var correctTransaction = genesisBlock.transactions.length === 0;
        if (!correctNouce || !correctPreviousBlockHash || !correctHash || !correctTransaction) {
            validChain = false;
        }
        return validChain;
    };
    return Blockchain;
}());
exports.default = Blockchain;
//# sourceMappingURL=blockchain.js.map