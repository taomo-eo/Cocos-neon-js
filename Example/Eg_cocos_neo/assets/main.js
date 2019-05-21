// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        logs: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log(Neon);

        const network = "TestNet";
        const privateKey = "9ab7e154840daca3a2efadaf0df93cd3a5b51768c632f5433f86909d9b994a69";
        const self = this;
        
        const apiProvider = new Neon.api.neoscan.instance(network); 
        console.log("\n\n--- API Provider ---");
        console.log(apiProvider);

        const account = new Neon.wallet.Account(privateKey);
        console.log("\n\n--- Login Address ---");
        console.log(account); 
        self.log("Account object created, address: \n" + account.address);

        this.account = account; 
        this.network = network;
        this.apiProvider = apiProvider;
    },

    onButtonLogin() {
        // deprecated, creation of Account Object moved into start() 
    },

    onButtonSendAsset() {
        const self = this;
        const account = this.account;
        const apiProvider = this.apiProvider;
        // Currently sending to self. Altetnative addr: ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW
        const receivingAddress = "ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s"; 

        const intent = Neon.api.makeIntent({ NEO: 1, GAS: 0.00000001 }, receivingAddress);
        console.log("\n\n--- Intents ---");
        intent.forEach(i => console.log(i));

        const config = {
            api: apiProvider,
            account: account,
            intents: intent
        };

        self.log("\n---Sending Asset---")
        Neon.api.sendAsset(config).then(config => {
            self.log("Asset sent to: \n" + receivingAddress);
            console.log("\n\n--- Response ---");
            console.log(config.response);
        }).catch(config => {
            self.log("Request unsuccessful")
            console.log(config);
        });
    },

    onButtonQueryAccountInfo() {
        const self = this; 
        const account = this.account; 
        const neoAssets = Neon.CONST.ASSETS; 

        self.log("\n---Account State---");
        const client = new Neon.rpc.RPCClient("http://seed3.ngd.network:20332");
        client.getBlockCount().then(value => {
            self.log("Block Height: " + value);
        }).catch(value => {
            self.log('Error: failed to get block height');
            console.log(value);
        });

        client.getAccountState(account.address, 1).then(value => {
            let balances = value['balances'];

            for (var i = 0; i < balances.length; i++) {
                var assetValue = balances[i]['value'];
                var assetScript = balances[i]['asset'];
                // Makes sure the asset script does not start with 0x                
                if (assetScript.startsWith('0x')) {
                    assetScript = assetScript.substring(2);
                };
                /*  Converts asset script to asset name, unless asset script is not 
                included in NeoAssets */
                var assetName = neoAssets[assetScript];
                if (typeof(assetName) === "undefined") {
                    assetName = assetScript; 
                }
                self.log(assetName + ": " + assetValue)
            }
        }).catch(value => {
            self.log("Error: failed to get account info");
            console.log(value);
        });

        console.log('\n Public Key: ' + account.publicKey)
    },

    onButtonClaimGas() {
        const self = this;
        const account = this.account;
        const apiProvider = this.apiProvider;

        const config = {
            api: apiProvider,
            account: account
        };

        self.log('\n---Claiming Gas---')
        Neon.api.claimGas(config).then(config => {
            self.log('Successful, txid: \n' + config['txid']) // TOFIX
            console.log("\n\n--- Gas Claim ---");
            console.log(config.response);
        }).catch(config=> {
            self.log('Error: Failed to claim gas')
            console.log(config);
        }); 
    },

    // TODO
    onButtonSmartContract() {
        const props = {
            scriptHash: '5b7074e873973a6ed3708862f219a6fbf4d1c411', //hash for the contract
            operation: 'balanceOf', // name of the operation to pass into SC
            args: [Neon.u.reverseHex('cef0c0fdcfe7838eff6ff104f9cdec2922297537')]
        }
        const script = Neon.create.script(props);

        self.log('\n---Invoking Contract---')
        // throws  Error: access denied
        Neon.rpc.Query.invokeScript(script)
        .execute('http://seed3.neo.org:20332')
        .then(result =>{
            console.log(result)
            // self.log('SC Invoked: ')
            // self.log(Neon.u.Fixed8.fromReverseHex(result['stack']['value']))
        }).catch(result =>{
            console.log('\n---Error---')
            console.log(result)
        })
    },

    log: function(s) {
        cc.log(s);
        let lines = this.logs.string.split('\n');
        // cc.log(lines);
        while (lines.length > 5) {
            lines.shift();
        }
        lines.push(s);
        this.logs.string = lines.join('\n');
    },

    // update (dt) {},
});
