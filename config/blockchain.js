const  Web3  = require('web3')
const contractABI = require('../blockchain/libraryManagementABI.json');

const provider = window.ethereum;
const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { 
    web3,
    contract

}