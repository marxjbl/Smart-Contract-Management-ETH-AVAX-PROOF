// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract VotingSystem {
    struct VotingSession {
        string title;
        mapping (string => uint) candidates;
    }

    mapping (address => VotingSession) public votingSessions;

    function createVotingSession(string memory _title) public {
        require(keccak256(abi.encodePacked(votingSessions[msg.sender].title)) == keccak256(abi.encodePacked("")), "Voting session already exists");
        votingSessions[msg.sender].title = _title;
    }

    function addCandidate(string memory _title, string memory _candidate) public {
        require(keccak256(abi.encodePacked(votingSessions[msg.sender].title)) == keccak256(abi.encodePacked(_title)), "Invalid voting session");
        votingSessions[msg.sender].candidates[_candidate] = 0;
    }

    function vote(string memory _title, string memory _candidate) public {
        require(keccak256(abi.encodePacked(votingSessions[msg.sender].title)) == keccak256(abi.encodePacked(_title)), "Invalid voting session");
        require(votingSessions[msg.sender].candidates[_candidate] != 0, "Candidate not found");
        votingSessions[msg.sender].candidates[_candidate]++;
    }

    function getVotingSessionTitle() public view returns (string memory) {
        return votingSessions[msg.sender].title;
    }

    function getCandidateVotes(string memory _candidate) public view returns (uint) {
        return votingSessions[msg.sender].candidates[_candidate];
    }
}