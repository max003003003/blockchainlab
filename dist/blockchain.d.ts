import Block from "./models/Block";
import Transaction from "./models/Transaction";
declare class Blockchain {
    chain: Block[];
    pendingTransaction: Transaction[];
    currentNodeUrl: string;
    networkNodes: string[];
    nodeAddress: string;
    constructor();
    createNewBlock(nouce: number, previousBlockHash: string, hash: string): Block;
    getLastBlock(): Block;
    createNewTransaction(amount: number, sender: string, recipient: string): Transaction;
    addTransactionToPendingTransaction(transaction: Transaction): number;
    hashBlock(previousBlockHash: string, currentBlockData: {
        index: number;
        transactions: Transaction[];
    }, nonce: number): string;
    proofOfWork(previousBlockHash: string, currentBlockData: {
        index: number;
        transactions: Transaction[];
    }): number;
    chainIsValid(blockchain: Blockchain): boolean;
}
export default Blockchain;
