const Blockchain = require('./blockchain.js');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2347433,"KJFLDFJIF","JDFKLSDF");
bitcoin.createNewTransaction(100, 'ALEX45JDLFJDF','JENNDJFDF23');
bitcoin.createNewBlock(34234,"KJFLdfdsfDFJIF","JDafadfFKLSDF");

bitcoin.createNewTransaction(30, 'ALEX45JDLFJDF','JENNDJFDF23');
bitcoin.createNewTransaction(400, 'ALEX45JDLFJDF','JENNDJFDF23');
bitcoin.createNewTransaction(20, 'ALEX45JDLFJDF','JENNDJFDF23');
bitcoin.createNewTransaction(1000, 'ALEX45JDLFJDF','JENNDJFDF23');
bitcoin.createNewTransaction(900, 'ALEX45JDLFJDF','JENNDJFDF23');

bitcoin.createNewBlock(5226,"SIKFDLLDODKD","090JDFDlD");


console.log(bitcoin);