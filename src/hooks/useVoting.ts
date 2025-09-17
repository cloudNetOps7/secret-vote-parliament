import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { useSecretVoteParliament } from './useContract';
import { 
  encryptVote, 
  encryptReputation, 
  generateFHEKeyPair,
  validateVoteData,
  validateReputationData,
  VoteData,
  ReputationData,
  EncryptedData
} from '@/lib/fhe-utils';

export interface VotingState {
  isEncrypting: boolean;
  isSubmitting: boolean;
  encryptionProgress: number;
  currentStep: string;
  error: string | null;
}

export interface VoteSubmission {
  proposalId: number;
  encryptedVote: EncryptedData;
  commitment: string;
  timestamp: number;
}

export const useVoting = () => {
  const { address } = useAccount();
  const { registerVoter, castVote } = useSecretVoteParliament();
  const [votingState, setVotingState] = useState<VotingState>({
    isEncrypting: false,
    isSubmitting: false,
    encryptionProgress: 0,
    currentStep: '',
    error: null
  });

  const [fheKeyPair, setFheKeyPair] = useState(() => generateFHEKeyPair());

  const updateVotingState = useCallback((updates: Partial<VotingState>) => {
    setVotingState(prev => ({ ...prev, ...updates }));
  }, []);

  const encryptVoteData = useCallback(async (
    proposalId: number, 
    voteChoice: 'yes' | 'no'
  ): Promise<EncryptedData | null> => {
    if (!address) {
      updateVotingState({ error: 'Wallet not connected' });
      return null;
    }

    const voteData: VoteData = {
      proposalId,
      voteChoice,
      voterAddress: address,
      timestamp: Date.now()
    };

    if (!validateVoteData(voteData)) {
      updateVotingState({ error: 'Invalid vote data' });
      return null;
    }

    try {
      updateVotingState({
        isEncrypting: true,
        encryptionProgress: 0,
        currentStep: 'Generating encryption keys...',
        error: null
      });

      // Simulate encryption progress
      const progressSteps = [
        'Generating encryption keys...',
        'Encrypting vote data...',
        'Generating zero-knowledge proof...',
        'Finalizing encryption...'
      ];

      for (let i = 0; i < progressSteps.length; i++) {
        updateVotingState({
          currentStep: progressSteps[i],
          encryptionProgress: (i + 1) * 25
        });
        
        // Simulate encryption delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const encryptedVote = encryptVote(voteData, fheKeyPair.publicKey);
      
      updateVotingState({
        isEncrypting: false,
        encryptionProgress: 100,
        currentStep: 'Encryption complete!',
        error: null
      });

      return encryptedVote;
    } catch (error) {
      updateVotingState({
        isEncrypting: false,
        error: `Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
      return null;
    }
  }, [address, fheKeyPair.publicKey, updateVotingState]);

  const encryptReputationData = useCallback(async (
    reputation: number
  ): Promise<EncryptedData | null> => {
    if (!address) {
      updateVotingState({ error: 'Wallet not connected' });
      return null;
    }

    const reputationData: ReputationData = {
      reputation,
      voterAddress: address,
      timestamp: Date.now()
    };

    if (!validateReputationData(reputationData)) {
      updateVotingState({ error: 'Invalid reputation data' });
      return null;
    }

    try {
      updateVotingState({
        isEncrypting: true,
        encryptionProgress: 0,
        currentStep: 'Encrypting reputation data...',
        error: null
      });

      // Simulate encryption progress
      const progressSteps = [
        'Validating reputation data...',
        'Encrypting with FHE...',
        'Generating proof of reputation...',
        'Finalizing encryption...'
      ];

      for (let i = 0; i < progressSteps.length; i++) {
        updateVotingState({
          currentStep: progressSteps[i],
          encryptionProgress: (i + 1) * 25
        });
        
        // Simulate encryption delay
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const encryptedReputation = encryptReputation(reputationData, fheKeyPair.publicKey);
      
      updateVotingState({
        isEncrypting: false,
        encryptionProgress: 100,
        currentStep: 'Reputation encryption complete!',
        error: null
      });

      return encryptedReputation;
    } catch (error) {
      updateVotingState({
        isEncrypting: false,
        error: `Reputation encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
      return null;
    }
  }, [address, fheKeyPair.publicKey, updateVotingState]);

  const submitEncryptedVote = useCallback(async (
    proposalId: number,
    voteChoice: 'yes' | 'no',
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) => {
    try {
      updateVotingState({
        isSubmitting: true,
        currentStep: 'Preparing encrypted vote...',
        error: null
      });

      // Step 1: Encrypt vote data
      const encryptedVote = await encryptVoteData(proposalId, voteChoice);
      if (!encryptedVote) {
        const error = 'Failed to encrypt vote data';
        updateVotingState({ isSubmitting: false, error });
        onError?.(error);
        return;
      }

      updateVotingState({
        currentStep: 'Submitting to blockchain...'
      });

      // Step 2: Submit to smart contract
      await castVote(proposalId, encryptedVote.ciphertext, encryptedVote.proof);

      updateVotingState({
        isSubmitting: false,
        currentStep: 'Vote submitted successfully!',
        error: null
      });

      toast.success('Encrypted vote submitted successfully!');
      onSuccess?.();

    } catch (error) {
      const errorMessage = `Vote submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      updateVotingState({
        isSubmitting: false,
        error: errorMessage
      });
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  }, [encryptVoteData, updateVotingState]);

  const submitEncryptedReputation = useCallback(async (
    reputation: number,
    onSuccess?: () => void,
    onError?: (error: string) => void
  ) => {
    try {
      updateVotingState({
        isSubmitting: true,
        currentStep: 'Preparing encrypted reputation...',
        error: null
      });

      // Step 1: Encrypt reputation data
      const encryptedReputation = await encryptReputationData(reputation);
      if (!encryptedReputation) {
        const error = 'Failed to encrypt reputation data';
        updateVotingState({ isSubmitting: false, error });
        onError?.(error);
        return;
      }

      updateVotingState({
        currentStep: 'Submitting to blockchain...'
      });

      // Step 2: Submit to smart contract
      await registerVoter(encryptedReputation.ciphertext, encryptedReputation.proof);

      updateVotingState({
        isSubmitting: false,
        currentStep: 'Reputation submitted successfully!',
        error: null
      });

      toast.success('Encrypted reputation submitted successfully!');
      onSuccess?.();

    } catch (error) {
      const errorMessage = `Reputation submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      updateVotingState({
        isSubmitting: false,
        error: errorMessage
      });
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  }, [encryptReputationData, updateVotingState]);

  const resetVotingState = useCallback(() => {
    setVotingState({
      isEncrypting: false,
      isSubmitting: false,
      encryptionProgress: 0,
      currentStep: '',
      error: null
    });
  }, []);

  return {
    votingState,
    fheKeyPair,
    encryptVoteData,
    encryptReputationData,
    submitEncryptedVote,
    submitEncryptedReputation,
    resetVotingState
  };
};
