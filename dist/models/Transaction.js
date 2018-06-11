"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = (function () {
    function Transaction(amount, sender, recipient, transactionId) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.transactionId = transactionId;
    }
    return Transaction;
}());
exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map