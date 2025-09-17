import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Clock, Users, Lock, CheckCircle, Plus, Crown, Scroll } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useSecretVoteParliament } from '@/hooks/useContract';
import { useVoting } from '@/hooks/useVoting';
import EncryptionProgress from './EncryptionProgress';
import { toast } from 'sonner';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  endTime: string;
  totalVotes: number;
  yesPercentage: number;
  isEncrypted: boolean;
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Implement New Guild Raid Difficulty',
    description: 'Proposal to add Mythic+ difficulty tiers to guild raids with enhanced rewards and progression systems.',
    status: 'active',
    endTime: '2024-01-20T23:59:59',
    totalVotes: 1247,
    yesPercentage: 0, // Hidden until voting ends
    isEncrypted: true
  },
  {
    id: '2',
    title: 'Treasury Allocation for World Events',
    description: 'Allocate 500,000 gold from guild treasury to fund server-wide seasonal events and competitions.',
    status: 'active',
    endTime: '2024-01-18T23:59:59',
    totalVotes: 892,
    yesPercentage: 0, // Hidden until voting ends
    isEncrypted: true
  }
];

const GovernanceProposal = () => {
  const { address, isConnected } = useAccount();
  const { 
    voterInfo, 
    totalVoters, 
    getProposalInfo, 
    checkVotingEligibility,
    registerVoter,
    createProposal,
    castVote,
    executeProposal,
    isPending,
    isConfirmed,
    error
  } = useSecretVoteParliament();

  const {
    votingState,
    submitEncryptedVote,
    submitEncryptedReputation,
    resetVotingState
  } = useVoting();

  const [selectedVote, setSelectedVote] = useState<{ [key: string]: 'yes' | 'no' | null }>({});
  const [hasVoted, setHasVoted] = useState<{ [key: string]: boolean }>({});
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [showEncryptionProgress, setShowEncryptionProgress] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    duration: 7, // days
    executionDelay: 1 // days
  });

  // Check if user is registered voter
  const isRegisteredVoter = voterInfo && voterInfo[2]; // isRegistered field

  const handleVote = (proposalId: string, vote: 'yes' | 'no') => {
    setSelectedVote(prev => ({ ...prev, [proposalId]: vote }));
  };

  const submitVote = async (proposalId: string) => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isRegisteredVoter) {
      toast.error('Please register as a voter first');
      return;
    }

    const voteChoice = selectedVote[proposalId];
    if (!voteChoice) {
      toast.error('Please select a vote option first');
      return;
    }

    // Show encryption progress
    setShowEncryptionProgress(true);
    resetVotingState();

    // Submit encrypted vote
    await submitEncryptedVote(
      parseInt(proposalId),
      voteChoice,
      () => {
        // Success callback
        setHasVoted(prev => ({ ...prev, [proposalId]: true }));
        setShowEncryptionProgress(false);
        toast.success('Encrypted vote submitted successfully!');
      },
      (error) => {
        // Error callback
        setShowEncryptionProgress(false);
        toast.error(`Vote submission failed: ${error}`);
      }
    );
  };

  const handleRegisterVoter = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Show encryption progress
    setShowEncryptionProgress(true);
    resetVotingState();

    // Submit encrypted reputation
    await submitEncryptedReputation(
      50, // Default reputation
      () => {
        // Success callback
        setShowEncryptionProgress(false);
        toast.success('Successfully registered as voter with encrypted reputation!');
      },
      (error) => {
        // Error callback
        setShowEncryptionProgress(false);
        toast.error(`Registration failed: ${error}`);
      }
    );
  };

  const handleCreateProposal = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isRegisteredVoter) {
      toast.error('Please register as a voter first');
      return;
    }

    try {
      await createProposal(
        newProposal.title,
        newProposal.description,
        newProposal.duration * 24 * 60 * 60, // Convert days to seconds
        newProposal.executionDelay * 24 * 60 * 60 // Convert days to seconds
      );
      
      setNewProposal({ title: '', description: '', duration: 7, executionDelay: 1 });
      setShowCreateProposal(false);
      toast.success('Proposal created successfully!');
    } catch (err) {
      toast.error('Failed to create proposal');
      console.error(err);
    }
  };

  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h remaining`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mystical-text mb-2">Secret Vote Parliament</h2>
        <p className="text-muted-foreground">Cast your encrypted vote to shape the future with FHE protection</p>
        
        {/* Voter Registration */}
        {isConnected && !isRegisteredVoter && (
          <div className="mt-4">
            <Button 
              onClick={handleRegisterVoter}
              disabled={isPending}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Register as Voter
            </Button>
          </div>
        )}
        
        {/* Create Proposal Button */}
        {isConnected && isRegisteredVoter && (
          <div className="mt-4">
            <Button 
              onClick={() => setShowCreateProposal(!showCreateProposal)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Proposal
            </Button>
          </div>
        )}
      </div>

      {/* Create Proposal Form */}
      {showCreateProposal && (
        <Card className="royal-card p-6">
          <h3 className="text-xl font-bold mb-4">Create New Proposal</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newProposal.title}
                onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border rounded-lg bg-background"
                placeholder="Enter proposal title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newProposal.description}
                onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border rounded-lg bg-background h-24"
                placeholder="Enter proposal description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Duration (days)</label>
                <input
                  type="number"
                  value={newProposal.duration}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded-lg bg-background"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Execution Delay (days)</label>
                <input
                  type="number"
                  value={newProposal.executionDelay}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, executionDelay: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded-lg bg-background"
                  min="0"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateProposal}
                disabled={isPending || !newProposal.title || !newProposal.description}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Proposal
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowCreateProposal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

              {/* Encryption Progress */}
              <EncryptionProgress 
                votingState={votingState} 
                isVisible={showEncryptionProgress} 
              />

              {mockProposals.map((proposal) => (
        <Card key={proposal.id} className="royal-card p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{proposal.title}</h3>
                  {proposal.isEncrypted && (
                    <Badge variant="secondary" className="gap-1 encrypt-pulse">
                      <Crown className="h-3 w-3" />
                      FHE Protected
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{proposal.description}</p>
              </div>
              <Badge 
                variant={proposal.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {proposal.status}
              </Badge>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getTimeRemaining(proposal.endTime)}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {proposal.totalVotes} votes cast
              </div>
            </div>

            {/* Voting Interface */}
            {!hasVoted[proposal.id] ? (
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex gap-3">
                  <Button
                    variant={selectedVote[proposal.id] === 'yes' ? 'mystical' : 'ethereal'}
                    onClick={() => handleVote(proposal.id, 'yes')}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Vote Yes
                  </Button>
                  <Button
                    variant={selectedVote[proposal.id] === 'no' ? 'destructive' : 'ethereal'}
                    onClick={() => handleVote(proposal.id, 'no')}
                    className="flex-1"
                  >
                    <Vote className="h-4 w-4 mr-2" />
                    Vote No
                  </Button>
                </div>
                
                {selectedVote[proposal.id] && (
                  <Button
                    variant="royal"
                    onClick={() => submitVote(proposal.id)}
                    disabled={isPending || votingState.isSubmitting || votingState.isEncrypting}
                    className="w-full"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Submit Encrypted Vote
                  </Button>
                )}
              </div>
            ) : (
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-mystical-gold">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Vote submitted and encrypted</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Results will be revealed when voting period ends
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GovernanceProposal;