import sha256 from 'sha256'
import uuid from 'uuid'
const currentNodeUrl = process.argv[3]
class Blockchain {
  chain: any[];
  pendingTransaction: any[];
  currentNodeUrl: string;
  networkNodes: any[];
  constructor () {
    this.chain = []
    this.pendingTransaction = []
    this.currentNodeUrl = currentNodeUrl
    this.networkNodes = []
    this.createNewBlock(100, '0', '0')
  }
  createNewBlock (nouce: number, previousBlockHash: String, hash: String) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransaction, 
      nouce: nouce,
      hash: hash,
      previousBlockHash: previousBlockHash
    }
    this.pendingTransaction = [] // clear  transaction
    this.chain.push(newBlock)
    return newBlock
  }
  getLastBlock () {
    return this.chain[this.chain.length - 1]
  }
  createNewTransaction (amount: Number, sender: String, recipient: String) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
      transactionId:  uuid().split('-').join('')
    }
    return newTransaction
  }
  addTransactionToPendingTransaction (transactionObj: any) {
    this.pendingTransaction.push(transactionObj)
    return this.getLastBlock()['index'] + 1
  }
  hashBlock (previousBlockHash: any, currentBlockData: any, nonce: any) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = sha256(dataAsString)
    return hash
  }
  proofOfWork (previousBlockHash: any, currentBlockData: { transactions: any[]; index: any; }) {
    let nouce = 0
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nouce)
    while (hash.substring(0, 4) !== '0000') {
      nouce++
      hash = this.hashBlock(previousBlockHash, currentBlockData, nouce)
    }
    return nouce
  }
  chainIsValid (blockchain: Blockchain[]) {
    let validChain = true
    for (let i = 1; i < blockchain.length; i++) {
      const currentBlock = blockchain[i]
      const prevBlock = blockchain[i - 1]
      const blockHash = this.hashBlock(prevBlock['hash'], {
        transactions: currentBlock['transactions'],
        index: currentBlock['index']
      }, currentBlock['nouce'])
      if (blockHash.substring(0, 4) !== '0000') {
        validChain = false
      }
      if (currentBlock['previousBlockHash'] !== prevBlock['hash']) { // chain not valid
        validChain = false
      }
    }
    const genesisBlock = blockchain[0]
    const correctNouce = genesisBlock['nouce'] === 100
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0'
    const correctHash = genesisBlock['hash'] === '0'
    const correctTransaction = genesisBlock['transactions'].length === 0
    if (!correctNouce || !correctPreviousBlockHash || !correctHash || !correctTransaction) { validChain = false }
    return validChain
  }
}
export default Blockchain
