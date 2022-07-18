pragma solidity ^0.8.13;

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

  struct Comment {
    address creator;
    string content;
    uint createdAt;
  }

  struct UserData {
    string name;
    string bio;
    string profile_image;
  }

  mapping(address => UserData) public users;

}
