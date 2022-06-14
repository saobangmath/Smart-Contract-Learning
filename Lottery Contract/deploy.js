const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const mnemonic = 'stone lake shell lock belt doll embody miracle favorite daring unfold isolate';
const rinkebyURL = 'https://rinkeby.infura.io/v3/92e532c74ee34981abed141ebb7d1f35';

const provider = new HDWalletProvider(mnemonic, rinkebyURL);
const web3 = new Web3(provider);

let deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploy new contract to account: ', accounts[0]);

    // deploy snippet;
    let contract = await new web3.eth.Contract(JSON.parse(interface))
                                     .deploy({data: bytecode})
                                     .send({from: accounts[0]});

    console.log('Contract deployed to address: ', contract.options.address);
    provider.engine.stop();
};

deploy();