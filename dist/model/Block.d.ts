import Transaction from "./Transaction";
export default class Block {
    index: number;
    timestamp: number;
    transactions: Transaction[];
    nouce: number;
    hash: string;
    previousBlockHash: string;
    constructor(index: number, timestamp: number, transaction: Transaction[], nouce: number, hash: string, previousBlockHash: string);
}
