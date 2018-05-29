const sha256 = require('sha256');
const uuid = require('uuid/v1');
const currentNodeUrl = process.argv[3];
function  Blockchain () {
    this.chain = [];
    this.pendingTransaction = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100,'0','0');
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
    recipient: recipient,
    transactionId: uuid().split('-').join('')
  };
  return newTransaction;
 }

Blockchain.prototype.addTransactionToPendingTransaction = function(transactionObj){
  this.pendingTransaction.push(transactionObj);
  return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash  + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData){
  let nouce = 0;
  let hash = this.hashBlock(previousBlockHash,currentBlockData,nouce);
  while(hash.substring(0,4) !== '0000' ) {
    nouce++;
    hash = this.hashBlock(previousBlockHash,currentBlockData,nouce);
    //console.log(hash);
  }
  return nouce;
}
module.exports = Blockchain;