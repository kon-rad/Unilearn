// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ULRN is ERC20, Ownable {
  constructor() ERC20('ULRNToken', 'ULRN') {
    // 21 million tokens
    _mint(msg.sender, 21000000 * (10 ** uint256(decimals())));
  }
}