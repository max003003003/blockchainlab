import { Request, Response } from "express";
import rp from "request-promise";
import BlockChain from "../blockchain";
import Transaction from "../models/Transaction";
const bitcoin = new BlockChain();
export let getBitCoint = (req: Request, res: Response) => {
    res.send(bitcoin);
};
// create new transaction to blockchain
export let addTransaction = (req: Request, res: Response) => {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);
    res.json({
        note: `Transaction will be added in block ${blockIndex}`,
    });
};
// mine a block
export let mine = async (req: Request, res: Response) => {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock.hash;
    const currentBlockData = {
        index: lastBlock.index + 1,
        transactions: bitcoin.pendingTransaction,
    };
    const nounce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockhash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nounce);
    const newBlock = bitcoin.createNewBlock(nounce, previousBlockHash, blockhash);
    const requestPromise: any[] = [];
    bitcoin.networkNodes.map((networkNodeUrl) => {
        requestPromise.push(rp({
            body: {
                newBlock,
            },
            json: true,
            method: "POST",
            uri: networkNodeUrl + "/receive-new-block",
        }));
    });
    await Promise.all(requestPromise);
    const requestOptions = {
        body: {
            amount: 12.5,
            recipient: bitcoin.nodeAddress,
            sender: "00",
        },
        json: true,
        method: "POST",
        uri: bitcoin.currentNodeUrl + "/transaction/broadcast",
    };
    await rp(requestOptions);
    res.json({
        block: newBlock,
        note: "New block mined successfully",
       });
};
// register a node a broadcast it the network
export let registerAndBroadcastNode = async (req: Request , res: Response) => {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) === -1) {
        bitcoin.networkNodes.push(newNodeUrl);
    }
    const regNodesPromise: any[] = [];
    bitcoin.networkNodes.map((networkNodeUrl) => {
        // register node endpoint
        const requestOptions = {
            body: { newNodeUrl },
            json: true,
            method: "POST",
            uri: networkNodeUrl + "/register-node",
        };
        regNodesPromise.push(rp(requestOptions));
    });

    await Promise.all(regNodesPromise);
    const bulkRegisterOptions = {
        body: {
            allnetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl],
        },
        json: true,
        method: "POST",
        uri: newNodeUrl + "/register-nodes-bulk",
    };
    await rp(bulkRegisterOptions);
    res.json({
        note: "New node registered with network successfully.",
    });
};
// register a node with network
export let registerNode = async (req: Request, res: Response) => {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) { bitcoin.networkNodes.push(newNodeUrl); }
    res.json({
        notes: "New node registered successfully",
    });
};
//
export let registerNodesBulk = async (req: Request, res: Response) => {
    const allNetworkNodes: string[] = req.body.allnetworkNodes; // all url
    allNetworkNodes.map((networkNodeUrl) => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) { bitcoin.networkNodes.push(networkNodeUrl); }
    });
    res.json({
        note: "Bulk registration successful.",
    });
};

export let transactionBroadcast =  async (req: Request, res: Response) => {
    const newTransaction = bitcoin.createNewTransaction(
        req.body.amount,
        req.body.sender,
        req.body.recipient,
    );
    const requestPromise: any[] = [];
    bitcoin.addTransactionToPendingTransaction(newTransaction);
    bitcoin.networkNodes.map((networkNodeUrl) => {
        const requestOptions = {
            body: newTransaction,
            json: true,
            method: "POST",
            uri: networkNodeUrl + "/transaction",
        };
        requestPromise.push(rp(requestOptions));
    });
    await Promise.all(requestPromise);
    res.send({
        note: "Transaction created and broadcast successfully.",
    });
};

export let recieveNewBlock = async (req: Request, res: Response) => {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock.index + 1 === newBlock.index;
    if (correctHash && correctIndex) {
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransaction = [];
        res.json({
            newBlock,
            note: "New block received and accepted",
        });
    } else {
        res.json({
          newBlock,
          note: "New block rejected",
        });
    }
};
export let registAllNode =  async (req: Request , res: Response) => {
    const nodeurls: string[] = req.body.nodeurls;
    const requestPromise: any[]  = [];
    nodeurls.map((nodeurl: any) => {
        const requestOptions = {
            body: {
                newNodeUrl: nodeurl,
            },
            json: true,
            method: "POST",
            uri: bitcoin.currentNodeUrl + "/register-and-broadcast-node",
        };
        requestPromise.push(rp(requestOptions));
    });
    await Promise.all(requestPromise);
    res.send({
        note: "Regist all node succesful",
    });
};

export let consensus = async (req: Request, res: Response) => {
    const requestPromises: any[] =  [];
    bitcoin.networkNodes.map((networkNodeUrl) => {
        const requestOptions = {
            json: true,
            method: "GET",
            uri: networkNodeUrl + "/blockchain",
        };
        requestPromises.push(rp(requestOptions));
    });
    const blockchains = await Promise.all(requestPromises);
    const currentChainLength = bitcoin.chain.length;
    let maxChainLength = currentChainLength;
    let newLongestChain;
    let newPendingTransactions: Transaction[]  = [];
    blockchains.map((blockchain) => {

        if (blockchain.chain.length > maxChainLength) {
            maxChainLength = blockchain.chain.length;
            newLongestChain = blockchain;
            newPendingTransactions = blockchain.pendingTransaction;
        }
    });

    if (!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
        res.json({
            chain: bitcoin.chain,
            note: "Current chain has not been replaced.",
        });
    } else if (newLongestChain && bitcoin.chainIsValid(newLongestChain)) {
        bitcoin.chain = newLongestChain;
        bitcoin.pendingTransaction = newPendingTransactions;
        res.json({
            chain: bitcoin.chain,
            note: "This chain has been replace",
        });
    }

};
