import Transaction from "./Transaction";
export default class Block {
    public index: number;
    public timestamp: number;
    public transactions: Transaction[];
    public nouce: number;
    public hash: string;
    public previousBlockHash: string;
    constructor(
    index: number, timestamp: number,
    transaction: Transaction[] , nouce: number,
    hash: string, previousBlockHash: string,
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transaction;
        this.nouce = nouce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
    }
}
