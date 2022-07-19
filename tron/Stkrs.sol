// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Stkrs {
  struct Stkr {
    uint id;
    address creator;
    string title;
    string organization;
    string description;
    string category;
    string image;
  }

  /* struct Comment {
    address creator;
    string content;
    uint createdAt;
  } */

  struct UserData {
    string name;
    string bio;
    string profile_image;
  }

  mapping(address => UserData) public users;
  Stkr[] public stkrs;

  function setUser(string memory name, string memory bio, string memory profile_image) public {
    users[msg.sender] = UserData(name, bio, profile_image);
  }

  function createStkr(string memory title, string memory organization, string memory description, string memory category, string memory image) public returns (uint) {
    Stkr memory s = Stkr(stkrs.length, msg.sender, title, organization, description, category, image);
    stkrs.push(s);
    return s.id;
  }

  event FriendRequest(address indexed from, address indexed to);

  function sendFriendRequest(address to) public {
    require(msg.sender != to, "Cannot friend yourself");
    emit FriendRequest(msg.sender, to);
  }

  event StkrSent(address indexed to, uint indexed stkr);

  function sendStkr(uint stkr, address to) public {
    require(stkrs.length > stkr, "Stkr does not exist");
    require(stkrs[stkr].creator == msg.sender, "Not creator of stkr");

    emit StkrSent(to, stkr);
  }

  event Comment(address indexed to, address creator, string content);

  function addComment(address user, string memory content) public {
    emit Comment(user, msg.sender, content);
  }

  mapping(address => uint[]) public pins;
  function addPin(uint stkr) public {
    require(pins[msg.sender].length < 5, "Too many pins");
    require(stkrs.length > stkr, "Invalid stkr");
    pins[msg.sender].push(stkr);
  }

  function removePin(uint stkr) public {
    require(pins[msg.sender].length > 0, "No pins");
    require(stkrs.length > stkr, "Invalid stkr");

    for (uint i = 0; i < pins[msg.sender].length; i++) {
      if (pins[msg.sender][i] == stkr) {
        pins[msg.sender][i] = pins[msg.sender][pins[msg.sender].length - 1];
        delete pins[msg.sender][pins[msg.sender].length - 1];
      }
    }
  }
}
