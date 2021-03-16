const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ba6337f8915fa19a1604b5c460db590f237785bbd15661c2b217dad6676b3001');

const myWalletAddress = myKey.getPublic('hex');

let paulCoin = new Blockchain();
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
paulCoin.addTransaction(tx1);

console.log('/n Starting the miner.......');
paulCoin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of myWallet', paulCoin.getBalanceOfAddress(myWalletAddress));

console.log('/n Starting the miner again ......');
paulCoin.minePendingTransactions(myWalletAddress);

// console.log('----------------------------------------------');
console.log('Entire Blockchian', paulCoin.chain);
console.log('genisis trans', paulCoin.chain[0].transactions);
console.log('Trans 1', paulCoin.chain[1].transactions);
console.log('Trans 2', paulCoin.chain[2].transactions);

console.log('\n FINAL :Balance of myWallet', paulCoin.getBalanceOfAddress(myWalletAddress));
