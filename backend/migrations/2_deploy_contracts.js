// migrations/2_deploy_contracts.js
const EasyPropertyDeals = artifacts.require("EasyPropertyDeals");
module.exports = function (deployer) {
  deployer.deploy(EasyPropertyDeals);
};
