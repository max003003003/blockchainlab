"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sha256_1 = __importDefault(require("sha256"));
var v1_1 = __importDefault(require("uuid/v1"));
var currentNodeUrl = process.argv[3];
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [];
        this.pendingTransaction = [];
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];
        this.createNewBlock(100, '0', '0');
    }
    Blockchain.prototype.createNewBlock = function (nouce, previousBlockHash, hash) {
        var newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransaction,
            nouce: nouce,
            hash: hash,
            previousBlockHash: previousBlockHash
        };
        this.pendingTransaction = []; // clear  transaction
        this.chain.push(newBlock);
        return newBlock;
    };
    Blockchain.prototype.getLastBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
        var newTransaction = {
            amount: amount,
            sender: sender,
            recipient: recipient,
            transactionId: v1_1.default().split('-').join('')
        };
        return newTransaction;
    };
    Blockchain.prototype.addTransactionToPendingTransaction = function (transactionObj) {
        this.pendingTransaction.push(transactionObj);
        return this.getLastBlock()['index'] + 1;
    };
    Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
        var dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        var hash = sha256_1.default(dataAsString);
        return hash;
    };
    Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
        var nouce = 0;
        var hash = this.hashBlock(previousBlockHash, currentBlockData, nouce);
        while (hash.substring(0, 4) !== '0000') {
            nouce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nouce);
        }
        return nouce;
    };
    Blockchain.prototype.chainIsValid = function (blockchain) {
        var validChain = true;
        for (var i = 1; i < blockchain.length; i++) {
            var currentBlock = blockchain[i];
            var prevBlock = blockchain[i - 1];
            var blockHash = this.hashBlock(prevBlock['hash'], {
                transactions: currentBlock['transactions'],
                index: currentBlock['index']
            }, currentBlock['nouce']);
            if (blockHash.substring(0, 4) !== '0000') {
                validChain = false;
            }
            if (currentBlock['previousBlockHash'] !== prevBlock['hash']) { // chain not valid
                validChain = false;
            }
        }
        var genesisBlock = blockchain[0];
        var correctNouce = genesisBlock['nouce'] === 100;
        var correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
        var correctHash = genesisBlock['hash'] === '0';
        var correctTransaction = genesisBlock['transactions'].length === 0;
        if (!correctNouce || !correctPreviousBlockHash || !correctHash || !correctTransaction) {
            validChain = false;
        }
        return validChain;
    };
    return Blockchain;
}());
exports.default = Blockchain;
