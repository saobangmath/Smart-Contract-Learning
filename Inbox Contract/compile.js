const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

/**
 * compile which source with no of contracts compile;
 */
module.exports = solc.compile(source, 1).contracts[":Inbox"];


