"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Block = /** @class */ (function () {
    function Block(index, timestamp, transaction, nouce, hash, previousBlockHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transaction;
        this.nouce = nouce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }
    return Block;
}());
exports.default = Block;
