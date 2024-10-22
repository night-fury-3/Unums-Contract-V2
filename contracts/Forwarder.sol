// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/metatx/ERC2771Forwarder.sol";

contract Forwarder is ERC2771Forwarder {
    event RequestExecuted(address indexed requester, bool success);
    event BatchExecuted(
        uint256 indexed batchSize,
        address indexed refundReceiver,
        bool success
    );

    constructor(string memory name) ERC2771Forwarder(name) {}

    /**
     * @dev Executes a single forward request.
     * @param request The forward request data.
     */
    function execute(
        ForwardRequestData calldata request
    ) public payable override {
        require(isAuthorized(msg.sender), "Not authorized");
        super.execute(request);
        console.log("msg.sender------------->", msg.sender);
        console.log("success------------->", true);
        emit RequestExecuted(msg.sender, true);
    }

    /**
     * @dev Executes a batch of forward requests and refunds any remaining gas to a specified address.
     * @param requests An array of forward request data.
     * @param refundReceiver The address that will receive any remaining gas funds.
     */
    function executeBatch(
        ForwardRequestData[] calldata requests,
        address payable refundReceiver
    ) public payable override {
        require(isAuthorized(msg.sender), "Not authorized");
        super.executeBatch(requests, refundReceiver);
        console.log("requests.length----------->", requests.length);
        console.log("refundReceiver----------->", refundReceiver);
        console.log("success----------->", true);
        emit BatchExecuted(requests.length, refundReceiver, true);
    }

    /**
     * @dev Dummy authorization method for illustrative purposes.
     */
    function isAuthorized(address user) internal pure returns (bool) {
        // Implement proper authorization logic
        console.log("user----------------->", user);
        return true; // Placeholder for authorization check }
    }
}
