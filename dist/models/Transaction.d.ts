export default class Transaction {
    amount: number;
    sender: string;
    recipient: string;
    transactionId: string;
    constructor(amount: number, sender: string, recipient: string, transactionId: string);
}
