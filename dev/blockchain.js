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
      transactions: this.pendingTransaction,
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
  }
  return nouce;
}

Blockchain.prototype.chainIsValid = function (blockchain) {
  let validChain = true;
  for(let i = 1 ; i < blockchain.length;i++){
     const currentBlock = blockchain[i];
     const prevBlock = blockchain[i-1];     
     const blockHash = this.hashBlock(
         prevBlock['hash'] ,{
         transactions: currentBlock['transactions'], 
         index: currentBlock['index']},
         currentBlock['nouce']
        );
     if(blockHash.substring(0,4) !== '0000'){
        validChain = false;
     }     
     if(currentBlock['previousBlockHash'] !== prevBlock['hash']){ //chain not valid
        validChain = false;
     }
       
  }
  
  const genesisBlock = blockchain[0]; 
  const correctNouce = genesisBlock['nouce'] === 100;
  const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0'
  const correctHash = genesisBlock['hash'] === '0';
  const correctTransaction = genesisBlock['transactions'].length === 0 ;
  if(!correctNouce || !correctPreviousBlockHash || !correctHash || !correctTransaction) validChain = false;
  return validChain;
}
module.exports = Blockchain;