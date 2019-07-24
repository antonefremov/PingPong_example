// /*global contract, config, it, assert*/

const PingPong = require('Embark/contracts/PingPong');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    "PingPong": {
      //args: [100]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("PingPong", function () {
  this.timeout(0);

  it("should call the ping method", async function () {

    let result = await PingPong.methods.ping().send();
    const txResult = result.events;
    console.log(txResult);
    assert.ok(1);

  });

  // it("set storage value", async function () {
  //   await SimpleStorage.methods.set(150).send();
  //   let result = await SimpleStorage.methods.get().call();
  //   assert.strictEqual(parseInt(result, 10), 150);
  // });

  // it("should have account with balance", async function() {
  //   let balance = await web3.eth.getBalance(accounts[0]);
  //   assert.ok(parseInt(balance, 10) > 0);
  // });
});
