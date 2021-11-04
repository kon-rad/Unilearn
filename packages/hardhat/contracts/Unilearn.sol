// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import "hardhat/console.sol";

contract Unilearn is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _quizzesIds;

  address payable owner;

  mapping(address => bool) public quizCreators;

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

  struct Quiz {
    string nftId;
    string answers;
    address submitter;
    address[] completed;
    bool exists;
  }

  modifier creatorsOnly {
    require(quizCreators[msg.sender], "Caller must be whitelisted quiz creator");
    _;
  }

  function createQuiz(string nftId, string answers) public payable creatorsOnly nonReentrant {

    bytes32 hash = keccak256(abi.encodePacked(nftId, block.number));

    quizIndex.push(hash);

    quizzes[hash] = Quiz(
      nftId,
      answers,
      msg.sender,
      [],
      true
    );
    _quizzesIds.increment();
    // todo: emit event
  }

  function getAllQuizzes() public view returns (Quiz[] memory) {
    uint numOfQuizzes = _quizzesIds.current();
    uint currentIndex = 0;

    Quiz[] memory allQuizzes = new Quiz[](numOfQuizzes);
    for (uint i = 0; i < numOfQuizzes; i++) {
      allQuizzes[currentIndex] = quizzes[i + 1];
      currentIndex += 1;
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