const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("HodlBot", function () {
  const STARTING_BLOCK_TIMESTAMP = 1640000000;
  const daiAddr = '0x6b175474e89094c44da98b954eedeac495271d0f'
  
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
   

    dai = await ethers.getContractAt("IERC20", daiAddr);
    await dai.connect(FTXSigner).transfer(await signerAddr, ethers.utils.parseEther('1000'))
    await (FTXSigner).sendTransaction({
      to: signerAddr,
      value: ethers.utils.parseEther('5')
    })

    const HodlBot = await ethers.getContractFactory("HodlBot");
    const hodlBot = await HodlBot.deploy();
    await hodlBot.deployed();

      // Forcing a timestamp here
      await network.provider.send("evm_setNextBlockTimestamp", [STARTING_BLOCK_TIMESTAMP])
      await network.provider.send("evm_mine")
  });

  it("Should steal some FTX Dai and ETH in fork for tests", async function () {
    const signer = await ethers.provider.getSigner(0);
    signerAddr = await signer.getAddress();
    const ethBalance = parseInt(ethers.utils.formatEther(await ethers.provider.getBalance(signerAddr)));
    const daiBalance = parseInt(ethers.utils.formatEther(await dai.balanceOf(signerAddr)));

    console.log(`${ethBalance} Ether in signer wallet`)
    console.log(`${daiBalance} Dai in signer wallet`)
    
    assert.isAbove(daiBalance, 0)
    assert.isAbove(ethBalance, 0)


  });

  describe( "depositToken()", () => {

    const expiryArg = STARTING_BLOCK_TIMESTAMP + 1000
    const amtArg = ethers.utils.parseEther('1')

    it("Should have deposit function that accepts ERC20"), async function () {
      console.log(expiryArg)
      console.log('stuff')
      await hodlBot.connect(user).depositToken(daiAddr, amtArg, expiryArg)

      const signerDeposit = await hodlBot.connect(user).deposits[signerAddr]
      console.log(signerDeposit)
      assert(signerDeposit)

    }
  
  
    it("Should record deposit object matching deposit"), async function () {
      
    }
  
    it("Should allow multiple deposits from different addresses"), async function () {
      
    }
  })

  describe( "withdrawToken()", () => {
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
  })
  

 
});