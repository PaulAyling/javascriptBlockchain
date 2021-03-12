const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

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
      this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
    ).toString();
  }
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block Mined:' + this.hash);
  }
}
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block('01/01/2017', 'Paul is still awesome', 0);
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty), console.log('Block fully mined');
    this.chain.push(block);
    this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }
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
console.log('Mining block 1');

paulCoin.createTransaction(new Transaction('add_1', 'add_2', 100));
paulCoin.createTransaction(new Transaction('add_2', 'add_1', 50));

console.log('/n Starting the miner.......');
paulCoin.minePendingTransactions('Nigels address');

console.log('\n Balnace of Nigels is', paulCoin.getBalanceOfAddress('Nigels address'));

console.log('/n Starting the miner again ......');
paulCoin.minePendingTransactions('Nigels address');

console.log('\n Balance of Nigels:', paulCoin.getBalanceOfAddress('Nigels address'));
console.log('\n Balance of add_1:', paulCoin.getBalanceOfAddress('add_1'));
console.log('\n Balance of add_2:', paulCoin.getBalanceOfAddress('add_2'));
console.log('----------------------------------------------');
console.log('Entire Blockchian', paulCoin.chain);
console.log('genisis trans', paulCoin.chain[0].transactions);
console.log('Trans 1', paulCoin.chain[1].transactions);
console.log('Trans 2', paulCoin.chain[2].transactions);
