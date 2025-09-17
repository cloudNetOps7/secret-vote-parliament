// FHE Encryption utilities for Secret Vote Parliament
// This is a simplified implementation for demonstration purposes
// In production, you would use Zama's FHE library

// Browser-compatible crypto utilities
const getRandomBytes = (length: number): Uint8Array => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(new Uint8Array(length));
  }
  // Fallback for environments without crypto.getRandomValues
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
};

const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const hexToBytes = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
};

export interface FHEKeyPair {
  publicKey: string;
  privateKey: string;
}

export interface EncryptedData {
  ciphertext: string;
  proof: string;
  nonce: string;
}

export interface VoteData {
  proposalId: number;
  voteChoice: 'yes' | 'no';
  voterAddress: string;
  timestamp: number;
}

export interface ReputationData {
  reputation: number;
  voterAddress: string;
  timestamp: number;
}

/**
 * Generate FHE key pair for encryption
 */
export function generateFHEKeyPair(): FHEKeyPair {
  // In a real implementation, this would use Zama's FHE key generation
  const publicKey = bytesToHex(getRandomBytes(32));
  const privateKey = bytesToHex(getRandomBytes(32));
  
  return {
    publicKey: `0x${publicKey}`,
    privateKey: `0x${privateKey}`
  };
}

/**
 * Encrypt vote data using FHE
 */
export function encryptVote(voteData: VoteData, publicKey: string): EncryptedData {
  const { proposalId, voteChoice, voterAddress, timestamp } = voteData;
  
  // Create vote payload
  const votePayload = {
    proposalId,
    choice: voteChoice === 'yes' ? 1 : 0,
    voter: voterAddress,
    timestamp,
    nonce: bytesToHex(getRandomBytes(16))
  };
  
  // Simulate FHE encryption
  const ciphertext = btoa(JSON.stringify(votePayload));
  const encryptedCiphertext = `0x${bytesToHex(new TextEncoder().encode(ciphertext))}`;
  
  // Generate zero-knowledge proof
  const proof = generateVoteProof(voteData, publicKey);
  
  return {
    ciphertext: encryptedCiphertext,
    proof,
    nonce: `0x${votePayload.nonce}`
  };
}

/**
 * Encrypt reputation data using FHE
 */
export function encryptReputation(reputationData: ReputationData, publicKey: string): EncryptedData {
  const { reputation, voterAddress, timestamp } = reputationData;
  
  // Create reputation payload
  const reputationPayload = {
    reputation,
    voter: voterAddress,
    timestamp,
    nonce: bytesToHex(getRandomBytes(16))
  };
  
  // Simulate FHE encryption
  const ciphertext = btoa(JSON.stringify(reputationPayload));
  const encryptedCiphertext = `0x${bytesToHex(new TextEncoder().encode(ciphertext))}`;
  
  // Generate zero-knowledge proof
  const proof = generateReputationProof(reputationData, publicKey);
  
  return {
    ciphertext: encryptedCiphertext,
    proof,
    nonce: `0x${reputationPayload.nonce}`
  };
}

/**
 * Generate zero-knowledge proof for vote
 */
function generateVoteProof(voteData: VoteData, publicKey: string): string {
  const { proposalId, voteChoice, voterAddress, timestamp } = voteData;
  
  // Create proof payload
  const proofPayload = {
    proposalId,
    choice: voteChoice === 'yes' ? 1 : 0,
    voter: voterAddress,
    timestamp,
    publicKey,
    signature: bytesToHex(getRandomBytes(32))
  };
  
  // Simulate ZK proof generation
  const proof = btoa(JSON.stringify(proofPayload));
  return `0x${bytesToHex(new TextEncoder().encode(proof))}`;
}

/**
 * Generate zero-knowledge proof for reputation
 */
function generateReputationProof(reputationData: ReputationData, publicKey: string): string {
  const { reputation, voterAddress, timestamp } = reputationData;
  
  // Create proof payload
  const proofPayload = {
    reputation,
    voter: voterAddress,
    timestamp,
    publicKey,
    signature: bytesToHex(getRandomBytes(32))
  };
  
  // Simulate ZK proof generation
  const proof = btoa(JSON.stringify(proofPayload));
  return `0x${bytesToHex(new TextEncoder().encode(proof))}`;
}

/**
 * Verify encrypted vote (for contract verification)
 */
export function verifyVoteProof(encryptedData: EncryptedData, publicKey: string): boolean {
  try {
    // In a real implementation, this would verify the ZK proof
    const proofHex = encryptedData.proof.slice(2);
    const proofBytes = hexToBytes(proofHex);
    const proofString = new TextDecoder().decode(proofBytes);
    const proofData = JSON.parse(atob(proofString));
    
    // Basic verification
    return proofData.publicKey === publicKey && proofData.signature.length === 64;
  } catch (error) {
    console.error('Proof verification failed:', error);
    return false;
  }
}

/**
 * Decrypt vote data (for off-chain result calculation)
 */
export function decryptVote(encryptedData: EncryptedData, privateKey: string): VoteData | null {
  try {
    // In a real implementation, this would use FHE decryption
    const ciphertextHex = encryptedData.ciphertext.slice(2);
    const ciphertextBytes = hexToBytes(ciphertextHex);
    const ciphertextString = new TextDecoder().decode(ciphertextBytes);
    const decryptedData = JSON.parse(atob(ciphertextString));
    
    return {
      proposalId: decryptedData.proposalId,
      voteChoice: decryptedData.choice === 1 ? 'yes' : 'no',
      voterAddress: decryptedData.voter,
      timestamp: decryptedData.timestamp
    };
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Generate commitment for vote (for privacy)
 */
export function generateVoteCommitment(voteData: VoteData): string {
  const commitment = {
    proposalId: voteData.proposalId,
    choice: voteData.voteChoice === 'yes' ? 1 : 0,
    timestamp: voteData.timestamp,
    hash: bytesToHex(getRandomBytes(32))
  };
  
  return `0x${bytesToHex(new TextEncoder().encode(JSON.stringify(commitment)))}`;
}

/**
 * Validate vote data before encryption
 */
export function validateVoteData(voteData: VoteData): boolean {
  return (
    voteData.proposalId > 0 &&
    (voteData.voteChoice === 'yes' || voteData.voteChoice === 'no') &&
    voteData.voterAddress.length === 42 &&
    voteData.voterAddress.startsWith('0x') &&
    voteData.timestamp > 0
  );
}

/**
 * Validate reputation data before encryption
 */
export function validateReputationData(reputationData: ReputationData): boolean {
  return (
    reputationData.reputation >= 0 &&
    reputationData.reputation <= 100 &&
    reputationData.voterAddress.length === 42 &&
    reputationData.voterAddress.startsWith('0x') &&
    reputationData.timestamp > 0
  );
}
