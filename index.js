const { Client,FileCreateTransaction,PrivateKey,Hbar, FileId } = require("@hashgraph/sdk");

require("dotenv").config();

const json = require('./compiled.json');

async function main() {
    const myAccountId = process.env.MY_ACCOUNT_ID;

    const myPrivateKey = process.env.MY_PRIVATE_KEY;


    if (null === myAccountId || null === myPrivateKey) {
        throw new Error("Account and key needed");
    }

    const client = Client.forTestnet();
    client.setOperator(myAccountId,myPrivateKey);

    const contractByteCode = json['data']['bytcode']['object'];

    //Store Contract in file
    const storedAsFile = await new FileCreateTransaction()
    .setContents(contractByteCode)
    .setKeys([PrivateKey.fromString(myPrivateKey)])
    .setMaxTransactionFee(new Hbar(2))
    .execute(client)


    const fileTransactionReceipt = await storedAsFile.getReceipt(client);
    const fileId= new FileId(fileTransactionReceipt.fileId)
}