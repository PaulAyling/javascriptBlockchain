const SHA256 = require('crypto-js/sha256');

class Block {
  /**
   * @param {number} timestamp
   * @param {Transaction[]} transactions
   * @param {string} previousHash
   */
  constructor(timestamp, transactions, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)
    ).toString();
  }
}
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2017', 'Pau is still awesome', 0);
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
    //mythis = this.chain
    //mylist('block1', 'block2')
    //mylist[0] = 'block1'
  }
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
let paulCoin = new Blockchain();
paulCoin.addBlock(new Block(1, '03/03/2021', { amount: 4 }));
paulCoin.addBlock(new Block(1, '03/03/2021', { amount: 10 }));

console.log(JSON.stringify(paulCoin, null, 4));
console.log('isChainValid?', paulCoin.isChainValid());

paulCoin.chain[1].data = { amount: 100 };
paulCoin.chain[1].hash = paulCoin.chain[1].calculateHash();


console.log(JSON.stringify(paulCoin, null, 4));

console.log('isChainValid?', paulCoin.isChainValid());
