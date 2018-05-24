function  Blockchain () {
    this.chain = [];
    this.pendingTransaction = [];
  }
  
Blockchain.prototype.createNewBlock= function(nouce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transaction: this.pendingTransaction,
      nouce: nouce,
      hash: hash,
      previousBlockHash: previousBlockHash
    };
    this.pendingTransaction = []; //clear  transaction
    this.chain.push(newBlock);
    return newBlock;
  }

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length -1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient
  };
  this.pendingTransaction.push(newTransaction);

  return this.getLastBlock()['index'] + 1; //return the number of the block that this transaction will be added to.
}

module.exports = Blockchain;