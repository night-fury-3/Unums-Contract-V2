const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Forwarder Contract", function () {
  async function deployForwarderFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    const forwarder = await ethers.deployContract("Forwarder", ["Forwarder"]);
    await forwarder.waitForDeployment();
    return { forwarder, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("should initialize correctly", async function () {
      const { forwarder } = await loadFixture(deployForwarderFixture);

      console.log("forwarder.name--------------->", await forwarder.name_());
      expect(await forwarder.name_()).to.equal("Forwarder");
    });
  });

  describe("Functionality", function () {
    it("should execute a single forward request", async function () {
      const { forwarder, owner, user1, user2 } = await loadFixture(
        deployForwarderFixture
      );

      console.log("forwarder.address---------->", forwarder);
      console.log("owner---------->", owner);
      console.log("user1---------->", user1);
      console.log("user2---------->", user2);

      // Here we assume the structure of ForwardRequestData
      const forwardRequestData = {
        from: user1.address,
        to: user2.address,
        value: 0,
        gas: 300000,
        nonce: 0,
        data: "0x01",
        deadline: Math.floor(Date.now() / 1000) + 3600,
        signature: owner.address,
      };

      // Assume isAuthorized always returns true for testing. Implement it properly to test fully.
      await expect(
        forwarder.execute(forwardRequestData, {
          value: 0,
        })
      )
        .to.emit(forwarder, "RequestExecuted")
        .withArgs(user1.address, true);
    });

    // it("should execute a batch of forward requests", async function () {
    //   const { forwarder, owner, user1, user2 } = await loadFixture(
    //     deployForwarderFixture
    //   );
    //   const forwardRequestDataArray = [
    //     {
    //       from: user2.address,
    //       to: user1.address,
    //       value: ethers.parseEther("1.0"),
    //       gas: 300000,
    //       nonce: 0,
    //       data: "0x02",
    //       deadline: Math.floor(Date.now() / 1000) + 3600,
    //       signature: owner.address,
    //     },
    //     {
    //       from: user2.address,
    //       to: user1.address,
    //       value: ethers.parseEther("1.0"),
    //       gas: 300000,
    //       nonce: 1,
    //       data: "0x03",
    //       deadline: Math.floor(Date.now() / 1000) + 3600,
    //       signature: owner.address,
    //     },
    //   ];
    //   // Passing arbitary data here for illustration. Provide actual expected data.
    //   await expect(
    //     forwarder.executeBatch(forwardRequestDataArray, user2.address, {
    //       value: ethers.parseEther("2.0"),
    //     })
    //   )
    //     .to.emit(forwarder, "BatchExecuted")
    //     .withArgs(forwardRequestDataArray.length, user2.address, true);
    // });
  });
});
