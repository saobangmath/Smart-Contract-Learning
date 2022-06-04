const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

/**
 * constructor (account mnemonic phase, url)
 */
const provider = new HDWalletProvider(
    'stone lake shell lock belt doll embody miracle favorite daring unfold isolate',
    'https://rinkeby.infura.io/v3/92e532c74ee34981abed141ebb7d1f35'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempt to deploy from account: ', accounts[0]);

    const contract = await new web3.eth.Contract(JSON.parse(interface))
                                       .deploy({data: bytecode, arguments: ['HelloWorld']})
                                       .send({gas:'1000000', from: accounts[0]}); 

    console.log('Deploy the contract to: ', contract.options.address);

    /* prevent a hanging deployment */
    provider.engine.stop();
};

deploy();