/** @type import('hardhat/config').HardhatUserConfig */
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

task("accounts", "Hello,world!", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for(const account of accounts) {
      console.log(await account.address);
    }
})

module.exports = {
  solidity: "0.7.3",
};
