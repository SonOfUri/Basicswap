// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IERC20.sol";

contract SimpleSwap {
    address public token1Address;
    address public token2Address;

    constructor(address _token1Address, address _token2Address) {
        token1Address = _token1Address;
        token2Address = _token2Address;
    }

    function swapToken1ToToken2(uint256 amount, address recipient) external {
        IERC20 token1 = IERC20(token1Address);
        IERC20 token2 = IERC20(token2Address);

        require(amount > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient address");

        require(token1.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        require(token2.transfer(recipient, amount), "Transfer failed");
    }

    function swapToken2ToToken1(uint256 amount, address recipient) external {
        IERC20 token1 = IERC20(token1Address);
        IERC20 token2 = IERC20(token2Address);

        require(amount > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient address");

        require(token2.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        require(token1.transfer(recipient, amount), "Transfer failed");
    }
}
