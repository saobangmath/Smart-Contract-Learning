const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts, lottery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // deploy the contract using the accounts[0];

    lottery = await new web3.eth.Contract(JSON.parse(interface))
                            .deploy({data : bytecode})
                            .send({from : accounts[0], gas : '1000000'});
});

/**
 * assert.equals(ground_truth, real);
 */

describe('Lottery Contract', () => {
    it('Deploy a contract',() => {
        assert.ok(lottery.options.address);
    });

    it('Allow one account to enter', async () => {
        await lottery.methods.enter() 
                             .send({from: accounts[0], value : web3.utils.toWei('0.02', 'ether')}); // send function;
        
        const players = await lottery.methods.getPlayers()
                                             .call({from: accounts[0]}); // call functions;
        
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('DisAllow one account to enter as minimum ether required', async () => {
        let err = null;
        try{
            await lottery.methods.enter()
                                .send({from: accounts[0], value: web3.utils.toWei('0.009', 'ether')}); 
        }
        catch(catchedErr){
            err = catchedErr;
        }
        assert.notEqual(err, null);
    });

    it('Allow multiple accounts to enter', async () => {
        const money = web3.utils.toWei('0.02', 'ether');
        const no = 3;
        for (let i = 0; i < no; i++){
            await lottery.methods.enter()
                                 .send({from: accounts[i], value : money});
        }

        const players = await lottery.methods.getPlayers()
                                       .call({from: accounts[0]});
        
        assert(no, players.length);
        for (let i = 0; i < no; i++){
            assert.equal(accounts[i], players[i]);
        }
    });
}); 
