const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain();
const port = process.argv[2];
const rp = require('request-promise');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.get('/blockchain',(req,res)=>{
  res.send(bitcoin);
});

//create new transaction to blockchain
app.post('/transaction',(req,res)=>{
  const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender, req.body.recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}.`});
})
//mine a block
app.get('/mine',(req,res)=>{
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
      transaction: bitcoin.pendingTransaction,
      index: lastBlock['index'] + 1 
  };
  const nounce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nounce);
  bitcoin.createNewTransaction(12.5, "00" ,nodeAddress);
  const newBlock = bitcoin.createNewBlock(nounce, previousBlockHash, blockhash);

  res.json({
    note: "New block mined successfully",
    block: newBlock
  })

})
// register a node a broadcast it the network
app.post('/register-add-broadcast-node', async(req,res)=>{
  const newNodeUrl = req.body.newNodeUrl;
  if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1){  
   bitcoin.networkNodes.push(newNodeUrl);
  }
  const regNodesPromise = [];
  //broadcase newurl to network
  bitcoin.networkNodes.map(v=>console.log(v))
  bitcoin.networkNodes.map( networkNodeUrl =>{
    // register node endpoint   
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl},
      json: true
    };
    regNodesPromise.push(rp(requestOptions));
  });

  await Promise.all(regNodesPromise);
  const bulkRegisterOptions = {
    uri: newNodeUrl + '/register-nodes-bulk',
    method: 'POST',
    body: {
      allnetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]      
    },
    json: true
  }
  await rp(bulkRegisterOptions);
  res.json({
    note: 'New node registered with network successfully.'
  })  
});


// register a node with network
app.post('/register-node',(req,res)=>{
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
  res.json({
    notes: 'New node registered successfully'
  })
})
//
app.post('/register-nodes-bulk', (req,res)=>{
  const allNetworkNodes = req.body.allnetworkNodes; // all url
  allNetworkNodes.map(networkNodeUrl =>{
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode)
    { bitcoin.networkNodes.push(networkNodeUrl);}
  });
  res.json({
    note: 'Bulk registration successful.'
  })
})
app.listen(port, ()=>{
  console.log(`Listening on port ${port} ...`)
})