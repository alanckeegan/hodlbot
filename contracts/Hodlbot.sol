//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "./interfaces/IERC20.sol";

contract HodlBot {
  //Deposits Mapping for deposits[depositor][date][token[amount]
  mapping(address => Deposit[]) public deposits;
  bool internal entered;


  struct Deposit {
    address token;
    uint amount;
    uint expiry;
  }

  modifier noReentry {
    require(!entered, "No Reentry");
    entered = true;
    _;
    entered = false;
  }

  constructor() {
  }

  function makeDeposit(address _token, uint _amount, uint _expiry) external  noReentry {
      require(IERC20(_token).transferFrom(msg.sender, address(this), _amount));
      deposits[msg.sender].push(Deposit(_token, _amount, _expiry));
  }

  function withdraw() external noReentry {
    for (uint i = 0; i < deposits[msg.sender].length; i++) {
      Deposit memory thisDeposit = deposits[msg.sender][i];
      if(thisDeposit.expiry <= block.timestamp) {
        delete deposits[msg.sender][i];
        require(IERC20(thisDeposit.token).transfer(msg.sender, thisDeposit.amount));
      }
    }
      
  }





}