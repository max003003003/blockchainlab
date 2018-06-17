class MockBitcoin {
  public bc1;
  public bc2;
  constructor() {
    this.bc1 = {
      "chain": [
      {
      "index": 1,
      "timestamp": 1529218144573,
      "transactions": [],
      "nouce": 100,
      "hash": "0",
      "previousBlockHash": "0"
      },
      {
      "index": 2,
      "timestamp": 1529218371588,
      "transactions": [
      {
      "amount": 5,
      "sender": "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
      "recipient": "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
      "transactionId": "4c74178adc514bf0acbf8ddcc74a7cc3"
      },
      {
      "amount": 5,
      "sender": "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
      "recipient": "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
      "transactionId": "fb506edd67e749dfb2178bf86d1640c7"
      }
      ],
      "nouce": 106262,
      "hash": "00008bd636d99c9492ab018718785c1503d1d687c3636959e8139001a713a4ec",
      "previousBlockHash": "0"
      },
      {
      "index": 3,
      "timestamp": 1529218426339,
      "transactions": [
      {
      "amount": 12.5,
      "sender": "00",
      "recipient": "153af87a73f9467f9039a4d13c92faaa",
      "transactionId": "f7b00045b9c04cf286daa07eb13a9235"
      },
      {
      "amount": 5,
      "sender": "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
      "recipient": "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
      "transactionId": "c9beb9695f834347a6a68ffa170c82c4"
      },
      {
      "amount": 5,
      "sender": "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
      "recipient": "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
      "transactionId": "c9beb9695f834347a6a68ffa170c82c4"
      },
      {
      "amount": 5,
      "sender": "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
      "recipient": "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
      "transactionId": "4020e6b340ca40eaa5a13245d0f39e5f"
      },
      {
      "amount": 5,
      "sender": "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
      "recipient": "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
      "transactionId": "4020e6b340ca40eaa5a13245d0f39e5f"
      },
      {
      "amount": 12.5,
      "sender": "00",
      "recipient": "e43ea46c181f4b03a18187f5091d1729",
      "transactionId": "af183d27f8c9418d86b58eb4cba674c1"
      }
      ],
      "nouce": 64601,
      "hash": "0000779cd9a00764f2a36f99d35735e6038f947ad337db0ee1231facb6946d14",
      "previousBlockHash": "00008bd636d99c9492ab018718785c1503d1d687c3636959e8139001a713a4ec"
      }
      ],
      "pendingTransaction": [
      {
      "amount": 12.5,
      "sender": "00",
      "recipient": "153af87a73f9467f9039a4d13c92faaa",
      "transactionId": "a0883d3105d64a219ff0afee95ef54fe"
      },
      {
      "amount": 12.5,
      "sender": "00",
      "recipient": "153af87a73f9467f9039a4d13c92faaa",
      "transactionId": "a0883d3105d64a219ff0afee95ef54fe"
      }
      ],
      "currentNodeUrl": "http://localhost:3001",
      "networkNodes": [
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
      "http://localhost:3005"
      ],
      "nodeAddress": "153af87a73f9467f9039a4d13c92faaa"
      };
    this.bc2 = {
      chain: [
        {
          hash: "0",
          index: 1,
          nouce: 100,
          previousBlockHash: "0",
          timestamp: 1529218144573,
          transactions: [],
        },
        {
          hash: "00008bd636d99c9492ab018718785c1503d1d687c3636959e8139001a713a4ec",
          index: 2,
          nouce: 106262,
          previousBlockHash: "0",
          timestamp: 1529218371588,
          transactions: [
            {
              amount: 5,
              recipient: "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
              sender: "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
              transactionId: "4c74178adc514bf0acbf8ddcc74a7cc3",
            },
            {
              amount: 5,
              recipient: "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
              sender: "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
              transactionId: "fb506edd67e749dfb2178bf86d1640c7",
            },
          ],
        },
        {
          hash: "0000779cd9a00764f2a36f99d35735e6038f947ad337db0ee1231facb6946d14",
          index: 3,
          nouce: 64601,
          previousBlockHash: "00008bd636d99c9492ab018718785c1503d1d687c3636959e8139001a713a4ec",
          timestamp: 1529218426339,
          transactions: [
            {
              amount: 12.5,
              recipient: "153af87a73f9467f9039a4d13c92faaa",
              sender: "00",
              transactionId: "f7b00045b9c04cf286daa07eb13a9235",
            },
            {
              amount: 5,
              recipient: "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
              sender: "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
              transactionId: "c9beb9695f834347a6a68ffa170c82c4",
            },
            {
              amount: 5,
              recipient: "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
              sender: "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
              transactionId: "c9beb9695f834347a6a68ffa170c82c4",
            },
            {
              amount: 5,
              recipient: "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
              sender: "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
              transactionId: "4020e6b340ca40eaa5a13245d0f39e5f",
            },
            {
              amount: 5,
              recipient: "LHDLFJKFLSJFD:FJKDdfdfdfFJSF",
              sender: "ASDJFODFIEF0FLE23dtKFJEdf0FLD",
              transactionId: "4020e6b340ca40eaa5a13245d0f39e5f",
            },

          ],
        },
      ],
      currentNodeUrl: "http://localhost:3001",
      networkNodes: [
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
      ],
      nodeAddress : "153af87a73f9467f9039a4d13c92faaa",
      pendingTransaction: [
        {
          amount: 12.5,
          recipient: "153af87a73f9467f9039a4d13c92faaa",
          sender: "00",
          transactionId: "a0883d3105d64a219ff0afee95ef54fe",
        },
        {
          amount: 12.5,
          recipient: "153af87a73f9467f9039a4d13c92faaa",
          sender: "00",
          transactionId: "a0883d3105d64a219ff0afee95ef54fe",
        },
      ],
    };
  }
}

export default MockBitcoin;
