import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running
    // web3 = new Web3(window.web3.currentProvider);
    web3 = new Web3(window.ethereum);
    // window.ethereum.enable();
    window.ethereum.send('eth_requestAccounts')
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/2b65989c94f940b2ba097aabe9441e01'
        );
    web3 = new Web3(provider);
}

// const web3 = new Web3(window.web3.currentProvider);
// const web3 = new Web3(window.ethereum);
// window.ethereum.enable();

export default web3;