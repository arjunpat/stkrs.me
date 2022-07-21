// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Stkrs {
  address[] public stkrCreator;
  mapping(address => uint[]) public pins;

  event UserUpdated(address addr, string name, string bio, string profile_image, string telegram_username);
  event StkrCreated(uint id, string title, string organization, string description, string category, string image);
  event FriendRequest(address from, address to);
  event StkrSent(address to, uint stkr);
  event Comment(address to, address creator, string content);

  function updateUser(string memory name, string memory bio, string memory profile_image, string memory telegram_username) public {
    emit UserUpdated(msg.sender, name, bio, profile_image, telegram_username);
  }

  function createStkr(string memory title, string memory organization, string memory description, string memory category, string memory image) public returns (uint) {
    uint id = stkrCreator.length;
    emit StkrCreated(id, title, organization, description, category, image);
    stkrCreator.push(msg.sender);
    return id;
  }

  function sendFriendRequest(address to) public {
    require(msg.sender != to, "Cannot friend yourself");
    emit FriendRequest(msg.sender, to);
  }

  function sendStkr(uint stkr, address to) public {
    require(stkrCreator.length > stkr, "Stkr does not exist");
    require(stkrCreator[stkr] == msg.sender, "Not creator of stkr");

    emit StkrSent(to, stkr);
  }

  function addComment(address user, string memory content) public {
    emit Comment(user, msg.sender, content);
  }

  function addPin(uint stkr) public {
    require(pins[msg.sender].length < 5, "Too many pins");
    require(stkrCreator.length > stkr, "Invalid stkr");
    pins[msg.sender].push(stkr);
  }

  function removePin(uint stkr) public {
    require(pins[msg.sender].length > 0, "No pins");
    require(stkrCreator.length > stkr, "Invalid stkr");

    for (uint i = 0; i < pins[msg.sender].length; i++) {
      if (pins[msg.sender][i] == stkr) {
        pins[msg.sender][i] = pins[msg.sender][pins[msg.sender].length - 1];
        pins[msg.sender].pop();
      }
    }
  }
}
