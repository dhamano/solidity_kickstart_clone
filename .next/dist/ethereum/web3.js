'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running
    // web3 = new Web3(window.web3.currentProvider);
    web3 = new _web2.default(window.ethereum);
    // window.ethereum.enable();
    window.ethereum.send('eth_requestAccounts');
} else {
    // We are on the server *OR* the user is not running metamask
    var provider = new _web2.default.providers.HttpProvider('https://rinkeby.infura.io/v3/2b65989c94f940b2ba097aabe9441e01');
    web3 = new _web2.default(provider);
}

// const web3 = new Web3(window.web3.currentProvider);
// const web3 = new Web3(window.ethereum);
// window.ethereum.enable();

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJldGhlcmV1bSIsInNlbmQiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQOzs7Ozs7QUFFQSxJQUFJLFlBQUo7O0FBRUEsSUFBSSxPQUFPLEFBQVAsV0FBa0IsQUFBbEIsZUFBaUMsT0FBTyxPQUFPLEFBQWQsU0FBdUIsQUFBNUQsYUFBeUUsQUFDckU7QUFDQTtBQUNBO1dBQU8sQUFBSSxBQUFKLGtCQUFTLE9BQU8sQUFBaEIsQUFBUCxBQUNBO0FBQ0E7V0FBTyxBQUFQLFNBQWdCLEFBQWhCLEtBQXFCLEFBQXJCLEFBQ0g7QUFORCxPQU1PLEFBQ0g7QUFDQTtRQUFNLFdBQVcsSUFBSSxjQUFLLEFBQUwsVUFBZSxBQUFuQixhQUNiLEFBRGEsQUFBakIsQUFHQTtXQUFPLEFBQUksQUFBSixrQkFBUyxBQUFULEFBQVAsQUFDSDs7O0FBRUQ7QUFDQTtBQUNBLEFBRUE7O2tCQUFlLEFBQWYiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGhhbWFuby9Eb2N1bWVudHMvR2l0SHViL1VEZW15L0V0aF9Tb2xpZGl0eS8wMy1LaWNrc3RhcnRlciJ9