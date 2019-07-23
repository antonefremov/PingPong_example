let choo = require('choo');
let html = require('choo/html');
let app = choo();
let Web3 = require('web3');
let contractABI = require('./dist/contracts/PingPong.json').abiDefinition;

app.use(function (state, emitter) {
    state.uploads = [];

    emitter.on('DOMContentLoaded', async () => {
        // Check for web3 instance. Create if necessary.
        // Access MetaMask
        if (window.ethereum) {
            try {
                console.log("Enabling the accounts");
                await window.ethereum.enable();
            } catch (error) {
                console.log(error);
            }
        }

        web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8556"));
        // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8556"));
        state.contractInstance = new web3.eth.Contract(contractABI, "0xe382d20e72E5681C15aBBb30C7E1063138A78F99");

        const accounts = await web3.eth.getAccounts();
        state.account = accounts[0];

        // Unlock account
        web3.eth.personal.unlockAccount(accounts[0], "", 1000000, async function (error, result) {
            if (error) {
                console.error(error);
            }
            else {
                console.log("Setting default account to " + accounts[0]);
                web3.eth.defaultAccount = accounts[0];
            }
        });

        // Listen for the LogUpload event, push a new item into the state and trigger re-render
        state.contractInstance.events.Pong((err, event) => {
            if (err) {
                console.error(err);
            }

            console.log('Pong event has been caught');
        });

        emitter.emit('render');
    })
});

const main = (state, emit) => {

    return html`
    <div>
        <form onsubmit="${firePingCall}" method="post">
            <label for="hash">Call the ping contract method by the button:</label><br>
            <input type="submit" value="Ping!">
        </form>
    </div>`

    function firePingCall(e) {
        e.preventDefault();
        state.contractInstance.methods.ping().send({ from: web3.eth.defaultAccount });
    }
}

// create a route
app.route('/', main);
// start app
app.mount('div');
