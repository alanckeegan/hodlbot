const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("HodlBot", function () {
  

  before(async () => {
    const signer = await ethers.provider.getSigner(0);
    signerAddr = await signer.getAddress()
    console.log(ethers.utils.formatEther(await ethers.provider.getBalance(signerAddr)))

    const FTX = '0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2';
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [FTX]
    })
    FTXSigner = await ethers.provider.getSigner(FTX);
   

    dai = await ethers.getContractAt("IERC20", "0x6b175474e89094c44da98b954eedeac495271d0f");
    await dai.connect(FTXSigner).transfer(await signerAddr, ethers.utils.parseEther('1000'))
    await (FTXSigner).sendTransaction({
      to: signerAddr,
      value: ethers.utils.parseEther('5')
    })

    const HodlBot = await ethers.getContractFactory("HodlBot");
    const hodlBot = await HodlBot.deploy();
    await hodlBot.deployed();
});



  it("We steal some FTX Dai and ETH in fork", async function () {
    const signer = await ethers.provider.getSigner(0);
    signerAddr = await signer.getAddress();
    const ethBalance = parseInt(ethers.utils.formatEther(await ethers.provider.getBalance(signerAddr)));
    const daiBalance = parseInt(ethers.utils.formatEther(await dai.balanceOf(signerAddr)));

    console.log(`${ethBalance} Ether in signer wallet`)
    console.log(`${daiBalance} Dai in signer wallet`)
    
    assert.isAbove(daiBalance, 0)
    assert.isAbove(ethBalance, 0)
  });

  it("Should have deposit function that accepts ERC20"), async function () {

  }

  it("Should record deposit object matching deposit"), async function () {
    
  }

  it("Should allow multiple deposits from different addresses"), async function () {
    
  }

  it("Should not allow withdrawal before expiry"), async function () {
    
  }

  it("Should not allow withdrawal from other address before expiry"), async function () {
    
  }

  it("Should not allow withdrawal from other address after expiry"), async function () {
    
  }

  it("Should allow withdrawal from depositor after expiry"), async function () {
    
  }

  it("Should delete withdrawn deposits"), async function () {
    
  }
});