const sha256 = require('sha256');

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

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash  + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData){
  let nouce = 0;
  let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
  while(hash.substring(0,4) !== '0000' ) {
    nonce++;
    hash = this.hashBlock(previousBlockHash,currentBlockData,nouce);
  }
  return nouce;
}
module.exports = Blockchain;