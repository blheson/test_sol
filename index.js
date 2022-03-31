const { Client, FileCreateTransaction, PrivateKey, Hbar, FileId, ContractCreateTransaction, ContractExecuteTransaction, ContractFunctionParameters } = require("@hashgraph/sdk");

require("dotenv").config();

const json = require('./compiled.json');

async function main() {
    const myAccountId = process.env.MY_ACCOUNT_ID;

    const myPrivateKey = process.env.MY_PRIVATE_KEY;


    if (null === myAccountId || null === myPrivateKey) {
        throw new Error("Account and key needed");
    }

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    const contractByteCode = json.data.bytecode.object;

    // //Store Contract in file
    // const storedAsFile = await new FileCreateTransaction()
    //     .setContents(contractByteCode)
    //     .setKeys([PrivateKey.fromString(myPrivateKey)])
    //     .setMaxTransactionFee(new Hbar(2))
    //     .execute(client)


    // const fileTransactionReceipt = await storedAsFile.getReceipt(client);
    // const fileId = new FileId(fileTransactionReceipt.fileId);


    // console.log("File Id", fileId.toString());
    // // Deploy contract
    // const myContract = await new ContractCreateTransaction()
    //     .setBytecodeFileId(fileId)
    //     .setGas(300000)
    //     .execute(client)

    // const contractReceipt = await myContract.getReceipt(client);

    // const contractID = contractReceipt.contractId;

    // console.log("Contract ID: ", contractID.toString());

    const setter = await new ContractExecuteTransaction()
        .setContractId('0.0.34094959')
        .setFunction('set', new ContractFunctionParameters().addUint32(7))
        .setGas(100000)
        .setMaxTransactionFee(new Hbar(1))
        .execute(client)

    const setterReceipt = await setter.getReceipt(client);
    console.log("setterReceipt: ", setterReceipt.toString());

    // const setterStatus = setterReceipt.status;

}
main()