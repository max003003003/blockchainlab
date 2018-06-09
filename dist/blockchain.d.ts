declare class Blockchain {
    chain: any[];
    pendingTransaction: any[];
    currentNodeUrl: string;
    networkNodes: any[];
    constructor();
    createNewBlock(nouce: any, previousBlockHash: any, hash: any): {
        index: number;
        timestamp: number;
        transactions: any[];
        nouce: any;
        hash: any;
        previousBlockHash: any;
    };
    getLastBlock(): any;
    createNewTransaction(amount: any, sender: any, recipient: any): {
        amount: any;
        sender: any;
        recipient: any;
        transactionId: any;
    };
    addTransactionToPendingTransaction(transactionObj: any): any;
    hashBlock(previousBlockHash: any, currentBlockData: any, nonce: any): any;
    proofOfWork(previousBlockHash: any, currentBlockData: any): number;
    chainIsValid(blockchain: any): boolean;
}
export default Blockchain;
