export default class Transaction {
    public amount: number;
    public sender: string;
    public recipient: string;
    public transactionId: string;
    constructor(
        amount: number,
        sender: string,
        recipient: string,
        transactionId: string,
    ) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.transactionId = transactionId;
    }
}
