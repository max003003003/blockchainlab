"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var BitcoinController = __importStar(require("./controllers/blockchainController"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/blockchain", BitcoinController.getBitCoint);
// // create new transaction to blockchain
// app.post("/transaction", (req, res) => {
//   const newTransaction = req.body
//   const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction)
//   res.json({
//     note: `Transaction will be added in block ${blockIndex}`
//   })
// })
// // mine a block
// app.get("/mine", async (req, res) => {
//   const lastBlock = bitcoin.getLastBlock()
//   const previousBlockHash = lastBlock["hash"]
//   const currentBlockData = {
//     transactions: bitcoin.pendingTransaction,
//     index: lastBlock["index"] + 1
//   }
//   // console.log(currentBlockData);
//   const nounce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
//   const blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nounce)
//   const newBlock = bitcoin.createNewBlock(nounce, previousBlockHash, blockhash)
//   const requestPromise = []
//   bitcoin.networkNodes.map(networkNodeUrl => {
//     const requestOptions = {
//       uri: networkNodeUrl + "/receive-new-block",
//       method: "POST",
//       body: {
//         newBlock: newBlock
//       },
//       json: true
//     }
//     requestPromise.push(rp(requestOptions))
//   })
//   await Promise.all(requestPromise)
//   const requestOptions = {
//     uri: bitcoin.currentNodeUrl + "/transaction/broadcast",
//     method: "POST",
//     body: {
//       amount: 12.5,
//       sender: "00",
//       recipient: bitcoin.nodeAddress
//     },
//     json: true
//   }
//   await rp(requestOptions)
//   res.json({
//     note: "New block mined successfully",
//     block: newBlock
//   })
// })
// // register a node a broadcast it the network
// app.post("/register-add-broadcast-node", async (req, res) => {
//   const newNodeUrl = req.body.newNodeUrl
//   if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
//     bitcoin.networkNodes.push(newNodeUrl)
//   }
//   const regNodesPromise = []
//   bitcoin.networkNodes.map(networkNodeUrl => {
//     // register node endpoint
//     const requestOptions = {
//       uri: networkNodeUrl + "/register-node",
//       method: "POST",
//       body: { newNodeUrl: newNodeUrl },
//       json: true
//     }
//     regNodesPromise.push(rp(requestOptions))
//   })
//   await Promise.all(regNodesPromise)
//   const bulkRegisterOptions = {
//     uri: newNodeUrl + "/register-nodes-bulk",
//     method: "POST",
//     body: {
//       allnetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
//     },
//     json: true
//   }
//   await rp(bulkRegisterOptions)
//   res.json({
//     note: "New node registered with network successfully."
//   })
// })
// // register a node with network
// app.post("/register-node", (req, res) => {
//   const newNodeUrl = req.body.newNodeUrl
//   const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1
//   const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
//   if (nodeNotAlreadyPresent && notCurrentNode) { bitcoin.networkNodes.push(newNodeUrl) }
//   res.json({
//     notes: "New node registered successfully"
//   })
// })
// //
// app.post("/register-nodes-bulk", (req, res) => {
//   const allNetworkNodes = req.body.allnetworkNodes // all url
//   allNetworkNodes.map(networkNodeUrl => {
//     const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1
//     const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
//     if (nodeNotAlreadyPresent && notCurrentNode) { bitcoin.networkNodes.push(networkNodeUrl) }
//   })
//   res.json({
//     note: "Bulk registration successful."
//   })
// })
// app.post("/transaction/broadcast", async (req, res) => {
//   const newTransaction = bitcoin.createNewTransaction(
//     req.body.amount,
//     req.body.sender,
//     req.body.recipient
//   )
//   const requestPromise = []
//   bitcoin.addTransactionToPendingTransaction(newTransaction)
//   bitcoin.networkNodes.map(networkNodeUrl => {
//     const requestOptions = {
//       uri: networkNodeUrl + "/transaction",
//       method: "POST",
//       body: newTransaction,
//       json: true
//     }
//     requestPromise.push(rp(requestOptions))
//   })
//   await Promise.all(requestPromise)
//   res.send({
//     note: "Transaction created and broadcast successfully."
//   })
// })
// app.post("/receive-new-block", async (req, res) => {
//   const newBlock = req.body.newBlock
//   const lastBlock = bitcoin.getLastBlock()
//   const correctHash = lastBlock.hash === newBlock.previousBlockHash
//   const correctIndex = lastBlock["index"] + 1 === newBlock["index"]
//   if (correctHash && correctIndex) {
//     bitcoin.chain.push(newBlock)
//     bitcoin.pendingTransaction = []
//     res.json({
//       note: "New block received and accepted",
//       newBlock: newBlock
//     })
//   } else {
//     res.json({
//       note: "New block rejected",
//       newBlock: newBlock
//     })
//   }
// })
// app.post("/regist-allnode", async (req, res) => {
//   const nodeurls = req.body.nodeurls
//   const requestPromise = []
//   nodeurls.map(nodeurl => {
//     const requestOptions = {
//       uri: bitcoin.currentNodeUrl + "/register-add-broadcast-node",
//       method: "POST",
//       body: {
//         newNodeUrl: nodeurl
//       },
//       json: true
//     }
//     requestPromise.push(rp(requestOptions))
//   })
//   await Promise.all(requestPromise)
//   res.send({
//     note: "Regist all node succesful"
//   })
// })
// app.get("/consensus", async (req, res) => {
//   let requestPromises = []
//   bitcoin.networkNodes.map(networkNodeUrl => {
//     const requestOptions = {
//       uri: networkNodeUrl + "/blockchain",
//       method: "GET",
//       json: true
//     }
//     requestPromises.push(rp(requestOptions))
//   })
//   const blockchains = await Promise.all(requestPromises)
//   const currentChainLength = bitcoin.chain.length
//   let maxChainLength = currentChainLength
//   let newLongestChain = null
//   let newPendingTransactions = null
//   blockchains.map(blockchain => {
//     if (blockchain.chain.length > maxChainLength) {
//       maxChainLength = blockchain.chain.length
//       newLongestChain = blockchain.chain
//       newPendingTransactions = blockchain.pendingTransaction
//     }
//   })
//   if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
//     res.json({
//       note: "Current chain has not been replaced.",
//       chain: bitcoin.chain
//     })
//   } else if (newLongestChain && bitcoin.chainIsValid(newLongestChain)) {
//     bitcoin.chain = newLongestChain
//     bitcoin.pendingTransaction = newPendingTransactions
//     res.json({
//       note: "This chain has been replace",
//       chain: bitcoin.chain
//     })
//   }
// });
exports.default = app;
