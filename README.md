# Secret Vote Parliament - FHE Governance Platform

A revolutionary decentralized governance platform that leverages **Fully Homomorphic Encryption (FHE)** to ensure complete privacy in voting while maintaining transparency and verifiability. Built on the Sepolia testnet with RainbowKit wallet integration.

## 🔐 Key Features

- **FHE-Protected Voting**: All votes are encrypted using fully homomorphic encryption, ensuring complete privacy
- **Decentralized Governance**: Smart contract-based proposal creation and execution
- **Voter Registration**: Reputation-based voting power system
- **Real-time Results**: Encrypted vote counting with results revealed only after voting ends
- **Modern UI**: Built with React, TypeScript, and shadcn/ui components
- **Wallet Integration**: Seamless connection with RainbowKit and multiple wallet providers

## 🏗️ Architecture

### Smart Contract (`SecretVoteParliament.sol`)
- **FHE Integration**: Uses Zama's FHE library for encrypted operations
- **Voter Management**: Registration with reputation-based voting power
- **Proposal System**: Creation, voting, and execution of governance proposals
- **Privacy Protection**: All sensitive data encrypted using FHE

### Frontend Application
- **React + TypeScript**: Modern, type-safe development
- **RainbowKit**: Multi-wallet connection support
- **Wagmi**: Ethereum interaction library
- **Vite**: Fast development and build tooling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible wallet
- Sepolia testnet ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/cloudNetOps7/secret-vote-parliament.git
cd secret-vote-parliament

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

## 📋 Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" to link your MetaMask or other supported wallet
- Ensure you're connected to the Sepolia testnet

### 2. Register as Voter
- Click "Register as Voter" to join the governance system
- Your reputation will determine your voting power

### 3. Create Proposals
- Registered voters can create new governance proposals
- Set voting duration and execution delay
- Proposals require majority approval to execute

### 4. Cast Votes
- Vote on active proposals with complete privacy
- Your vote is encrypted using FHE and cannot be seen until voting ends
- Results are revealed automatically when voting period concludes

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Smart Contract Development

The smart contract is located in `contracts/SecretVoteParliament.sol` and uses:
- Solidity ^0.8.24
- Zama FHE library for encryption
- Sepolia testnet configuration

### Frontend Development

Built with modern React patterns:
- Custom hooks for contract interaction (`useContract.ts`)
- Type-safe wallet integration
- Responsive design with Tailwind CSS

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `cloudNetOps7/secret-vote-parliament`

2. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
   NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
   ```

3. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# Upload the 'dist' folder contents
```

## 🔒 Security Features

- **FHE Encryption**: All votes encrypted using fully homomorphic encryption
- **Zero-Knowledge Proofs**: Vote verification without revealing individual choices
- **Decentralized Storage**: All data stored on blockchain for immutability
- **Reputation System**: Prevents sybil attacks through reputation-based voting power

## 🧪 Testing

The platform is currently deployed on Sepolia testnet for testing purposes. Get testnet ETH from:
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Faucet](https://sepoliafaucet.com/)

## 📚 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Blockchain**: Ethereum (Sepolia), Wagmi, RainbowKit
- **Encryption**: Zama FHE Library
- **Smart Contracts**: Solidity ^0.8.24
- **Deployment**: Vercel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Deploy to Vercel](#)
- **Smart Contract**: [View on Sepolia Etherscan](#)
- **Documentation**: [FHE Governance Guide](#)

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. The smart contract has not been audited and should not be used in production without proper security review.

---

**Built with ❤️ using FHE technology for a more private and secure future of governance.**
