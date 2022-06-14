const fs = require('fs');
const path = require('path');
const solc = require('solc');

const directory = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(directory, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Lottery'];
