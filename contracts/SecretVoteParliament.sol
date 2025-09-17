// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretVoteParliament is SepoliaConfig {
    using FHE for *;
    
    struct Proposal {
        euint32 proposalId;
        euint32 yesVotes;
        euint32 noVotes;
        euint32 totalVoters;
        bool isActive;
        bool isExecuted;
        string title;
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 executionDelay;
    }
    
    struct Vote {
        euint32 voteId;
        euint8 voteChoice; // 0 = No, 1 = Yes
        address voter;
        uint256 timestamp;
        bool isRevealed;
    }
    
    struct Voter {
        euint32 reputation;
        euint32 votingPower;
        bool isRegistered;
        bool hasVoted;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Vote) public votes;
    mapping(address => Voter) public voters;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    uint256 public proposalCounter;
    uint256 public voteCounter;
    
    address public owner;
    address public verifier;
    euint32 public totalRegisteredVoters;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId, bool result);
    event VoterRegistered(address indexed voter, uint32 reputation);
    event ReputationUpdated(address indexed voter, uint32 newReputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        totalRegisteredVoters = FHE.asEuint32(0);
    }
    
    function registerVoter(
        externalEuint32 reputation,
        bytes calldata inputProof
    ) public {
        require(!voters[msg.sender].isRegistered, "Voter already registered");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalReputation = FHE.fromExternal(reputation, inputProof);
        
        // Calculate voting power based on reputation (1-100 scale)
        euint32 votingPower = FHE.mul(internalReputation, FHE.asEuint32(10));
        
        voters[msg.sender] = Voter({
            reputation: internalReputation,
            votingPower: votingPower,
            isRegistered: true,
            hasVoted: false
        });
        
        // Increment total registered voters
        totalRegisteredVoters = FHE.add(totalRegisteredVoters, FHE.asEuint32(1));
        
        emit VoterRegistered(msg.sender, 0); // Will be decrypted off-chain
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _executionDelay
    ) public returns (uint256) {
        require(voters[msg.sender].isRegistered, "Only registered voters can create proposals");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            yesVotes: FHE.asEuint32(0),
            noVotes: FHE.asEuint32(0),
            totalVoters: FHE.asEuint32(0),
            isActive: true,
            isExecuted: false,
            title: _title,
            description: _description,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            executionDelay: _executionDelay
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(
        uint256 proposalId,
        externalEuint32 voteChoice,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(voters[msg.sender].isRegistered, "Only registered voters can vote");
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(!hasVoted[msg.sender][proposalId], "Already voted on this proposal");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVoteChoice = FHE.fromExternal(voteChoice, inputProof);
        
        // Ensure vote choice is valid (0 or 1)
        ebool isValidVote = FHE.or(
            FHE.eq(internalVoteChoice, FHE.asEuint32(0)),
            FHE.eq(internalVoteChoice, FHE.asEuint32(1))
        );
        require(FHE.decrypt(isValidVote), "Invalid vote choice");
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            voteChoice: FHE.asEuint8(internalVoteChoice),
            voter: msg.sender,
            timestamp: block.timestamp,
            isRevealed: false
        });
        
        // Update proposal vote counts
        ebool isYesVote = FHE.eq(internalVoteChoice, FHE.asEuint32(1));
        euint32 voterPower = voters[msg.sender].votingPower;
        
        // Add to yes votes if vote is yes, otherwise add to no votes
        proposals[proposalId].yesVotes = FHE.add(
            proposals[proposalId].yesVotes,
            FHE.select(isYesVote, voterPower, FHE.asEuint32(0))
        );
        
        proposals[proposalId].noVotes = FHE.add(
            proposals[proposalId].noVotes,
            FHE.select(isYesVote, FHE.asEuint32(0), voterPower)
        );
        
        proposals[proposalId].totalVoters = FHE.add(
            proposals[proposalId].totalVoters,
            FHE.asEuint32(1)
        );
        
        hasVoted[msg.sender][proposalId] = true;
        voters[msg.sender].hasVoted = true;
        
        emit VoteCast(voteId, proposalId, msg.sender);
        return voteId;
    }
    
    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period not ended");
        require(block.timestamp > proposals[proposalId].endTime + proposals[proposalId].executionDelay, "Execution delay not met");
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        
        // Determine if proposal passed (yes votes > no votes)
        ebool proposalPassed = FHE.gt(
            proposals[proposalId].yesVotes,
            proposals[proposalId].noVotes
        );
        
        proposals[proposalId].isActive = false;
        proposals[proposalId].isExecuted = true;
        
        emit ProposalExecuted(proposalId, FHE.decrypt(proposalPassed));
    }
    
    function updateVoterReputation(
        address voter,
        externalEuint32 newReputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(voters[voter].isRegistered, "Voter not registered");
        
        euint32 internalNewReputation = FHE.fromExternal(newReputation, inputProof);
        
        // Update reputation and recalculate voting power
        voters[voter].reputation = internalNewReputation;
        voters[voter].votingPower = FHE.mul(internalNewReputation, FHE.asEuint32(10));
        
        emit ReputationUpdated(voter, 0); // Will be decrypted off-chain
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        string memory title,
        string memory description,
        uint8 yesVotes,
        uint8 noVotes,
        uint8 totalVoters,
        bool isActive,
        bool isExecuted,
        address proposer,
        uint256 startTime,
        uint256 endTime
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            0, // FHE.decrypt(proposal.yesVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.noVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVoters) - will be decrypted off-chain
            proposal.isActive,
            proposal.isExecuted,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        uint8 voteChoice,
        address voter,
        uint256 timestamp,
        bool isRevealed
    ) {
        Vote storage vote = votes[voteId];
        return (
            0, // FHE.decrypt(vote.voteChoice) - will be decrypted off-chain
            vote.voter,
            vote.timestamp,
            vote.isRevealed
        );
    }
    
    function getVoterInfo(address voter) public view returns (
        uint8 reputation,
        uint8 votingPower,
        bool isRegistered,
        bool hasVoted
    ) {
        Voter storage voterData = voters[voter];
        return (
            0, // FHE.decrypt(voterData.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(voterData.votingPower) - will be decrypted off-chain
            voterData.isRegistered,
            voterData.hasVoted
        );
    }
    
    function getTotalRegisteredVoters() public view returns (uint8) {
        return 0; // FHE.decrypt(totalRegisteredVoters) - will be decrypted off-chain
    }
    
    function checkVotingEligibility(address voter, uint256 proposalId) public view returns (bool) {
        return voters[voter].isRegistered && !hasVoted[voter][proposalId];
    }
}
