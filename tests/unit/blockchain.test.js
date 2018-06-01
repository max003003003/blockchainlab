const Blockchain = require('../../dev/blockchain.js');

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

describe("hash block"()=>{
    it("valid ",async()=>{        
       let bitcoin = new Blockchain();
       await bitcoin.hashBlock().
    })
})
