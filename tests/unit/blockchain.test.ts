import Blockchain from "../../src/blockchain" 
import MockBitcoin  from "./mockbitcoint"
const bitcoin = new Blockchain()
const Mock = new MockBitcoin();
describe('valid hash block', () => {
  it('valid hash block', async () => {
    let bitcoin = new Blockchain()
    bitcoin.hashBlock = jest.fn(bitcoin.hashBlock)
    const output = await bitcoin.chainIsValid(Mock.bc1)
    expect(output).toBe(true)
    expect(bitcoin.hashBlock).toHaveBeenCalled()
  })

  it('Invalid hash block', async () => {
    let bitcoin = new Blockchain()
    bitcoin.hashBlock = jest.fn(bitcoin.hashBlock)
    const output = await bitcoin.chainIsValid(Mock.bc2)
    expect(output).toBe(false)
    expect(bitcoin.hashBlock).toHaveBeenCalled()
  })
})

describe('proof of work', () => {
  it('should mine new block after genesis block', async () => {
    let bitcoin = new Blockchain()
    bitcoin.hashBlock = jest.fn(bitcoin.hashBlock)
    const currentBlockData = { transactions: [], index: 2 }
    const nouce = await bitcoin.proofOfWork('0', currentBlockData)
    expect(nouce).toBe(18140)
    expect(bitcoin.hashBlock).toHaveBeenCalled()
  })

  it('should mine new block after normal block', async () => {
    let bitcoin = new Blockchain()
    bitcoin.hashBlock = jest.fn(bitcoin.hashBlock)
    const currentBlockData = {
      transactions:
        [{
          amount: 12.5,
          sender: '00',
          recipient: undefined,
          transactionId: '2a932c20657411e895dc97addaced53b'
        }],
      index: 3
    }
    const nouce = await bitcoin.proofOfWork('0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100', currentBlockData)
    expect(nouce).toBe(80083)
    expect(bitcoin.hashBlock).toHaveBeenCalled()
  })
})

describe('hash block', () => {
  it('should hash block', async () => {
    const currentBlockData = { transactions: [], index: 2 }
    const hash = await bitcoin.hashBlock('0', currentBlockData, 0)
    expect(hash).toBe('9d858973998eb5bd6cb8e97fbd6bf5eaa5ebe501aa00eb01e1e35d96bc731ccd')
  })
})

describe('addTransactionToPendingTransaction', () => {
  it('should addTransactionToPendingTransaction', async () => {
    let bitcoin = new Blockchain()
    bitcoin.pendingTransaction.push = jest.fn(bitcoin.pendingTransaction.push)
    const before = bitcoin.pendingTransaction.length
    expect(bitcoin.pendingTransaction).toHaveLength(before + 1)
    expect(bitcoin.pendingTransaction.push).toHaveBeenCalled()
  })
})

describe('createNewTransaction', () => {
  it('should createNewTransaction', async () => {
    const transaction = await bitcoin.createNewTransaction(
      11,
      'ASDJFODFIEF0FLEKFJE0FLD',
      'LHDLFJKFLSJFD:FJKDFJSF'

    )

    expect(transaction.amount).toBe(11)
    expect(transaction.sender).toBe('ASDJFODFIEF0FLEKFJE0FLD')
    expect(transaction.recipient).toBe('LHDLFJKFLSJFD:FJKDFJSF')
  })
})

describe('getLastBlock', () => {
  it('should getLastBlock', async () => {
    let bitcoin = new Blockchain()
    const lastBlock = await bitcoin.getLastBlock()
    expect(lastBlock).toBe(bitcoin.chain[0])
  })
})

describe('createNewBlock', () => {
  it('should create New Block', async () => {
    let bitcoin = new Blockchain()
    bitcoin.chain.push = jest.fn(bitcoin.chain.push)
    const lastBlock = await bitcoin.createNewBlock(1, '0', '0')
    expect(bitcoin.pendingTransaction).toHaveLength(0)
    expect(bitcoin.chain.push).toHaveBeenCalled()
    expect(bitcoin).not.toBe(null)
    expect(lastBlock).toEqual(expect.objectContaining({
      index: expect.any(Number),
      timestamp: expect.any(Number),
      transactions: expect.any(Array),
      nouce: expect.any(Number),
      hash: expect.any(String),
      previousBlockHash: expect.any(String)
    }))
  })
})
