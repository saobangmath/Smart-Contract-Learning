const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface,  bytecode} = require('../compile');

let accounts, inbox;

// fetch all eth accounts from ganache;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();    
    // use one account to deploy the contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
                              .deploy({data : bytecode, arguments : ['HelloWorld']})
                              .send({from: accounts[0], gas : '1000000'}); 
});

describe('Inbox', () => {
    it('Deploy a contract', () =>{
        console.log(inbox);
    });
})