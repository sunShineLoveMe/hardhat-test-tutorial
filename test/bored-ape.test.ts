import { ethers } from "hardhat";
import { expect } from "chai";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { beforeEach } from "mocha";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import exp from "constants";

chai.use(solidity);

describe("Bored Ape", () => {

    let boredApeContract: Contract;
    let owner: SignerWithAddress;
    let address1: SignerWithAddress;

    beforeEach(async() => {
        const BoredApeFactory = await ethers.getContractFactory("BoredApeYachtClub");
        [owner, address1] = await ethers.getSigners();
        // console.log("owner: ", owner); // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        // console.log("address1: ", address1); // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        boredApeContract = await BoredApeFactory.deploy(
            "Bored Ape Yacht Club",
            "BAYC",
            10000,
            1
        )
    })

    it("Should initialize the Bored Ape contract", async() => {
        expect(await boredApeContract.MAX_APES()).to.equal(10000);
    })

    it("should set the right owner", async() => {
        expect(await boredApeContract.owner()).to.equal(await owner.address);
    })

    it("Should mint an ape", async() => {
        await boredApeContract.flipSaleState();
        const apePrice = await boredApeContract.apePrice();
        const tokenId = await boredApeContract.totalSupply();
        expect(
            await boredApeContract.mintApe(1, {
                value: apePrice
            })
        ).to.emit(boredApeContract, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, tokenId);
    })
    // 
    // it("Should mint an Ape", async() => {
    //     await boredApeContract.flipSaleState();
    //     expect(await boredApeContract.mintApe(1)).to.emit(boredApeContract, "Transfer");
    // }) 

    // it("should initial Bored Ape contract", async ()=> {
    //     const BoredApeFactory = await ethers.getContractFactory("BoredApeYachtClub");
    //     const boredApeContract = await BoredApeFactory.deploy(
    //             "Bored Ape Yacht Club",
    //             "BAYC",
    //             10000,
    //             1);
    //     expect(await boredApeContract.MAX_APES()).to.equal(10000);
    // })

})