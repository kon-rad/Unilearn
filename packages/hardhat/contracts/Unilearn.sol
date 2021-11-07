// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import "hardhat/console.sol";

contract Unilearn is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _quizzesIds;

  uint[] quizIndex;
  address payable owner;

  struct Quiz {
    string nftId;
    address submitter;
    address[] completed;
    bool exists;
  }

  mapping(address => bool) public creatorsWhitelist;
  mapping(uint => Quiz) private idToQuiz;
  mapping(string => string) private nftIdToAnswer;

  constructor() {
    owner = payable(msg.sender);
  }

  modifier creatorsOnly {
    // todo: add restriction to whitelisted addresses only
    // todo: add whitelisting method
    // require(creatorsWhitelist[msg.sender], "Caller must be whitelisted quiz creator");
    _;
  }

  function createQuiz(string calldata nftId, string calldata answers) public payable creatorsOnly nonReentrant {
    console.log("createQuiz is called with :", nftId, answers);
    _quizzesIds.increment();
    uint quizId = _quizzesIds.current();

    idToQuiz[quizId] = Quiz(
      nftId,
      msg.sender,
      new address[](0),
      true
    );
    nftIdToAnswer[nftId] = answers;
    // todo: emit event
  }

  function getAllQuizzes() public view returns (Quiz[] memory) {
    console.log("getAllQuizzes is called");

    uint numOfQuizzes = _quizzesIds.current();
    uint currentQuiz = 0;

    Quiz[] memory allQuizzes = new Quiz[](numOfQuizzes);

    for (uint i = 0; i < numOfQuizzes; i++) {
      allQuizzes[currentQuiz] = idToQuiz[i + 1];
      currentQuiz += 1;
    }

    return allQuizzes;
  }

  function submitQuiz(string calldata nftId, string calldata answers) public view returns (string memory) {
    string memory correctAnswers = nftIdToAnswer[nftId];

    if (keccak256(bytes(correctAnswers)) == keccak256(bytes(answers))) {
      return "Correct Answer! Congratulations!";
    } else {
      return "Incorrect Answer! Try again!";
    }
  }
}