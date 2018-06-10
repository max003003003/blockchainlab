import CryptoJS from "crypto-js";
import uuid from "uuid";
import Block from "./model/Block";
import Transaction from "./model/Transaction";
const currentNodeUrl = process.argv[3];
class Blockchain {
  public chain: Block[];
  public pendingTransaction: Transaction[];
  public currentNodeUrl: string;
  public networkNodes: string[];
  public nodeAddress: string;
   constructor() {
    this.chain = [];
    this.pendingTransaction = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100, "0", "0");
    this.nodeAddress = uuid().split("-").join("");
  }
  public createNewBlock(nouce: number, previousBlockHash: string, hash: string) {
    const newBlock = new Block(
      this.chain.length + 1,
      Date.now(),
      this.pendingTransaction,
      nouce,
      hash,
      previousBlockHash,
    );
    this.pendingTransaction = []; // clear  transaction
    this.chain.push(newBlock);
    return newBlock;
  }
  public getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  public createNewTransaction(amount: number, sender: string, recipient: string) {
    const newTransaction = new Transaction(
      amount,
      sender,
      recipient,
      uuid().split("-").join(""),
    );
    return newTransaction;
  }
  public addTransactionToPendingTransaction(transaction: Transaction) {
    this.pendingTransaction.push(transaction);
    return this.getLastBlock().index  + 1;
  }
  public hashBlock(previousBlockHash: string,
                   currentBlockData: { index: number; transactions: Transaction[]; }, nonce: number) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = CryptoJS.SHA256(dataAsString).toString();
    return hash;
  }
  public proofOfWork(previousBlockHash: string, currentBlockData: { index: number;  transactions: Transaction[]; }) {
    let nouce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nouce);
    while (hash.substring(0, 4) !== "0000") {
      nouce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nouce);
    }
    return nouce;
  }
  public chainIsValid(blockchain: Blockchain) {
    let validChain = true;
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currentBlock: Block = blockchain.chain[i];
      const prevBlock: Block = blockchain.chain[i - 1];
      const blockHash = this.hashBlock(
        prevBlock.hash,
        {
          index: currentBlock.index,
          transactions: currentBlock.transactions,
        },
        currentBlock.nouce,
      );
      if (blockHash.substring(0, 4) !== "0000") {
        validChain = false;
      } else if (currentBlock.previousBlockHash !== prevBlock.hash) {
        validChain = false;
      }
    }
    const genesisBlock = blockchain.chain[0];
    const correctNouce = genesisBlock.nouce === 100;
    const correctPreviousBlockHash = genesisBlock.previousBlockHash === "0";
    const correctHash = genesisBlock.hash === "0";
    const correctTransaction = genesisBlock.transactions.length === 0;
    if (!correctNouce || !correctPreviousBlockHash || !correctHash || !correctTransaction) { validChain = false; }
    return validChain;
  }
}
export default Blockchain;
