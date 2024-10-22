const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Forwarder Contract", function () {
  async function deployForwarderFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    const forwarder = await ethers.deployContract("Forwarder", [
      "MyForwarderName",
    ]);
    await forwarder.waitForDeployment();
    return { forwarder, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("should initialize correctly", async function () {
      const { forwarder } = await loadFixture(deployForwarderFixture);

      console.log("forwarder.name--------------->", await forwarder.name_());
      expect(await forwarder.name_()).to.equal("MyForwarderName");
    });
  });

  // describe("Functionality", function () {
  //   it("should execute a single forward request", async function () {
  //     const { forwarder, owner, user1 } = await loadFixture(
  //       deployForwarderFixture
  //     );
  //     // Here we assume the structure of ForwardRequestData
  //     const forwardRequestData = {
  //       from: user1.address,
  //       to: owner.address,
  //       value: ethers.utils.parseEther("1.0"),
  //       gas: 300000,
  //       nonce: 0,
  //       data: "0x01",
  //     };

  //     // Assume isAuthorized always returns true for testing. Implement it properly to test fully.
  //     await expect(forwarder.execute(forwardRequestData))
  //       .to.emit(forwarder, "RequestExecuted")
  //       .withArgs(user1.address, true);
  //   });

  //   it("should execute a batch of forward requests", async function () {
  //     const { forwarder, owner, user2 } = await loadFixture(
  //       deployForwarderFixture
  //     );
  //     const forwardRequestDataArray = [
  //       {
  //         from: user2.address,
  //         to: owner.address,
  //         value: ethers.utils.parseEther("1.0"),
  //         gas: 300000,
  //         nonce: 0,
  //         data: "0x",
  //       },
  //       {
  //         from: user2.address,
  //         to: owner.address,
  //         value: ethers.utils.parseEther("1.0"),
  //         gas: 300000,
  //         nonce: 1,
  //         data: "0x",
  //       },
  //     ];
  //     // Passing arbitary data here for illustration. Provide actual expected data.
  //     await expect(
  //       forwarder.executeBatch(forwardRequestDataArray, user2.address)
  //     )
  //       .to.emit(forwarder, "BatchExecuted")
  //       .withArgs(forwardRequestDataArray.length, user1.address, true);
  //   });
  // });
});
