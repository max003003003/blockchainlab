const Blockchain = require('./blockchain.js');
const bitcoin = new Blockchain();

const previousBlockHash = 'LJDIFKDFJLSFJDLFSFLJDF459489';
const currentBlockData = [
  {
    amount: 100,
    sender: 'NFDLFJLKDFJDF',
    recipient: 'LJFDLKJFOSIFJD'
  },
  {
    amount: 30,
    sender: 'NJDLFJFDLFJLKDFJDF',
    recipient: 'LJYOPWBAISDFFDLKJFOSIFJD'
  },
  {
    amount: 230,
    sender: 'LIINJDLFJFDLFJLKDFJDF',
    recipient: 'JJDLJYOPWBAISDFFDLKJFOSIFJD'
  }
];

bitcoin.hashBlock()
console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

