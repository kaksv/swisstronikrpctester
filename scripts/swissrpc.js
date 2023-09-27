const hre = require("hardhat");

const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

// Initialize a provider with the SwissTronik testnet JSON-RPC URL
const provider = new ethers.JsonRpcProvider("https://json-rpc.testnet.swisstronik.com/");
// Replace with the slot you want to access (slot #0)
const slot = "0x0";

/**
 * Make a shielded query/call on the Swisstronik blockchain.
 *
 * @param {object} provider - The provider object for making the call.
 * @param {string} destination - The contract address to call.
 * @param {string} data - Encoded data for the function call.
 *
 * @returns {Uint8Array} - Encrypted response from the blockchain.
 */
const sendShieldedQuery = async (provider, destination, data) => {
  // Obtain the RPC link from the network configuration
  const rpcLink = hre.network.config.url;
//    Still thinking on whether we must utilise the json RPC Link provided.

  // Encrypt the call data using SwisstronikJS's encryption function
  const [encryptedData, usedEncryptionKey] = await encryptDataField(rpcLink, data);

  // Execute the query/call using the provider
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  // Decrypt the response using SwisstronikJS's decryption function
  return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};
// Main function to interact with the contract and retrieve data
async function main() {
  // Address of the deployed contract
//   Replaced the address with my test address.
  const replace_contractAddress = "0xf84Df872D385997aBc28E3f07A2E3cd707c9698a";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const replace_contractFactory = await provider.getStorageAt(contractAddress, slot);
//   const contract = replace_contractFactory.attach(replace_contractAddress);
  console.log("Retrieved Storage Value:", storageValue);

  // Perform a shielded query to retrieve data from the contract
  const replace_functionName = "totalSupply";
  const replace_functionArgs = ""; // Replace with specific arguments if required
  const responseMessage = await sendShieldedQuery(signer.provider, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs));

  // Decode the Uint8Array response into a readable string
  console.log("Decoded response:", contract.interface.decodeFunctionResult(replace_functionName, responseMessage)[0]);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});