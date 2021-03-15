const {Blockchain, Transaction} = require('./blockchain');


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
