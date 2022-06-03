const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

// fetch all eth accounts from ganache;
beforeEach(() => {
    web3.eth.getAccounts()
        .then((accounts) => {
            console.log(accounts);
        });
});

describe('Inbox', () => {
    it('Deploy a contract', () =>{});
})