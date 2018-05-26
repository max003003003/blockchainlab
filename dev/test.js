const Blockchain = require('./blockchain.js');
const bitcoin = new Blockchain();

const previousBlockHash = 'LJDIFKDFJLSFJDLFSFLJDF459489';
const currentBlocckData = [
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
const nonce = 100;


console.log(bitcoin.hashBlock(previousBlockHash, currentBlocckData, nonce));

