import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseAbi } from 'viem';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = parseAbi([
  'function registerVoter(bytes calldata reputation, bytes calldata inputProof) external',
  'function createProposal(string memory title, string memory description, uint256 duration, uint256 executionDelay) external returns (uint256)',
  'function castVote(uint256 proposalId, bytes calldata voteChoice, bytes calldata inputProof) external returns (uint256)',
  'function executeProposal(uint256 proposalId) external',
  'function getProposalInfo(uint256 proposalId) external view returns (string memory, string memory, uint8, uint8, uint8, bool, bool, address, uint256, uint256)',
  'function getVoterInfo(address voter) external view returns (uint8, uint8, bool, bool)',
  'function checkVotingEligibility(address voter, uint256 proposalId) external view returns (bool)',
  'function totalRegisteredVoters() external view returns (uint8)',
  'event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title)',
  'event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter)',
  'event ProposalExecuted(uint256 indexed proposalId, bool result)',
  'event VoterRegistered(address indexed voter, uint32 reputation)'
]);

// Contract address - This would be the deployed contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const useSecretVoteParliament = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const { data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read contract functions
  const { data: voterInfo } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getVoterInfo',
    args: address ? [address] : undefined,
  });

  const { data: totalVoters } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'totalRegisteredVoters',
  });

  const getProposalInfo = (proposalId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'getProposalInfo',
      args: [BigInt(proposalId)],
    });
  };

  const checkVotingEligibility = (proposalId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'checkVotingEligibility',
      args: address && proposalId ? [address, BigInt(proposalId)] : undefined,
    });
  };

  // Write contract functions
  const registerVoter = async (reputation: string, inputProof: string) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'registerVoter',
        args: [reputation as `0x${string}`, inputProof as `0x${string}`],
      });
    } catch (err) {
      console.error('Error registering voter:', err);
      throw err;
    }
  };

  const createProposal = async (
    title: string,
    description: string,
    duration: number,
    executionDelay: number
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createProposal',
        args: [title, description, BigInt(duration), BigInt(executionDelay)],
      });
    } catch (err) {
      console.error('Error creating proposal:', err);
      throw err;
    }
  };

  const castVote = async (proposalId: number, voteChoice: string, inputProof: string) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'castVote',
        args: [BigInt(proposalId), voteChoice as `0x${string}`, inputProof as `0x${string}`],
      });
    } catch (err) {
      console.error('Error casting vote:', err);
      throw err;
    }
  };

  const executeProposal = async (proposalId: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'executeProposal',
        args: [BigInt(proposalId)],
      });
    } catch (err) {
      console.error('Error executing proposal:', err);
      throw err;
    }
  };

  return {
    // Contract address and ABI
    contractAddress: CONTRACT_ADDRESS,
    contractABI: CONTRACT_ABI,
    
    // Read functions
    voterInfo,
    totalVoters,
    getProposalInfo,
    checkVotingEligibility,
    
    // Write functions
    registerVoter,
    createProposal,
    castVote,
    executeProposal,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
};
