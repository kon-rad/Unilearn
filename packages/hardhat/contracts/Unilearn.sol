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
    string answers;
    address submitter;
    address[] completed;
    bool exists;
  }

  mapping(address => bool) public creatorsWhitelist;
  mapping(uint => Quiz) private idToQuiz;

  constructor() {
    owner = payable(msg.sender);
  }

  // mapping quiz id -> 
    // answers
    // addresses that completed quiz

  // submitQuiz
    // check if user already took test
    // check answers
    // if correct, disburse tokens
    // get course id
      // update course progress per user
      // if user completed course - disburse NFT

  // createQuiz
    // check if whitelisted
    // generate id
    // post answers array
    // post NFT id - NFT stores description, and questions
    // return id

  modifier creatorsOnly {
    require(creatorsWhitelist[msg.sender], "Caller must be whitelisted quiz creator");
    _;
  }

  function createQuiz(string calldata nftId, string calldata answers) public payable creatorsOnly nonReentrant {

    console.log("createQuiz is called with :", nftId, answers);
    _quizzesIds.increment();
    uint quizId = _quizzesIds.current();

    idToQuiz[quizId] = Quiz(
      nftId,
      answers,
      msg.sender,
      new address[](0),
      true
    );
    // todo: emit event
  }

  function getAllQuizzes() public view returns (Quiz[] memory) {
    console.log("getAllQuizzes is called");

    uint numOfQuizzes = _quizzesIds.current();
    uint currentQuiz = 1;

    Quiz[] memory allQuizzes = new Quiz[](numOfQuizzes);

    for (uint i = 1; i < numOfQuizzes; i++) {
      allQuizzes[currentQuiz] = idToQuiz[i];
      currentQuiz += 1;
    }

    return allQuizzes;
  }

// - user address
//   - points
// - one course
//   - five questions - answer validated on chain
//     - if all correct
//       - check if user already claimed quiz
//       - user gets disbursed tokens
//   - if all five quizzes completed
//     - check if user already claimed quiz
//     - user get's NFT
//   - one quiz - one link - one nft - 10 tokens
//   - complete course - one NFT
// - must be whitelisted to create course
//   - course creators must stake 1 eth - get reimbursed when 100 people complete their course

}