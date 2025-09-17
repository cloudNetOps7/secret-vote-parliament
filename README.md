# 👑 Secret Vote Parliament
### *Where Democracy Meets Privacy*

> **"In the realm of governance, your voice matters, but your privacy matters more."**

A groundbreaking decentralized governance platform that revolutionizes how communities make decisions. By harnessing the power of **Fully Homomorphic Encryption (FHE)**, we ensure that every vote remains completely private until the final tally, creating a new paradigm of secure, transparent, and coercion-free governance.

🌐 **Live on Sepolia Testnet** | 🔐 **FHE Protected** | ⚡ **Lightning Fast**

## ✨ The Magic Behind Secret Vote Parliament

### 🛡️ **Privacy-First Architecture**
- **Zero-Knowledge Voting**: Your choices remain invisible until the final reveal
- **FHE Encryption**: Mathematical magic that keeps your vote secret while allowing computation
- **Coercion Resistance**: No one can see or influence your decision

### 🏛️ **Democratic Excellence**
- **Reputation-Based Power**: Your influence grows with your contributions
- **Transparent Execution**: All results are verifiable and immutable
- **Community-Driven**: Every voice has weight, every vote has impact

### 🚀 **Cutting-Edge Technology**
- **Next-Gen UI**: Sleek, intuitive interface built for the future
- **Multi-Wallet Support**: Connect with your preferred wallet seamlessly
- **Real-Time Updates**: Stay informed with live governance events

## 🏗️ The Royal Architecture

### 👑 **Smart Contract Kingdom** (`SecretVoteParliament.sol`)
- **FHE Magic**: Zama's encryption library powers our privacy engine
- **Voter Registry**: Join the parliament with reputation-based influence
- **Proposal Throne**: Create, debate, and execute governance decisions
- **Privacy Fortress**: Every sensitive operation is cryptographically protected

### 🎨 **Frontend Palace**
- **React Royalty**: Modern, type-safe development with React 18
- **RainbowKit Bridge**: Seamless multi-wallet connectivity
- **Wagmi Warriors**: Battle-tested Ethereum interaction library
- **Vite Velocity**: Lightning-fast development and deployment

## 🚀 Join the Parliament

### 📋 **Before You Begin**
- **Node.js 18+** and npm installed
- **MetaMask** or compatible wallet ready
- **Sepolia ETH** for gas fees (get from faucets)

### ⚡ **Lightning Setup**

```bash
# Enter the Parliament
git clone https://github.com/cloudNetOps7/secret-vote-parliament.git
cd secret-vote-parliament

# Install the royal dependencies
npm install

# Launch the kingdom
npm run dev
```

### 🔧 **Environment Configuration**

Create your `.env` file with these royal settings:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

## 📋 The Royal Journey

### 1. 🏰 **Enter the Castle**
- Click "Connect Wallet" to link your digital identity
- Ensure you're connected to the Sepolia testnet realm

### 2. 👑 **Join the Parliament**
- Click "Register as Voter" to become a citizen of the realm
- Your reputation will determine your influence in governance

### 3. 📜 **Propose Your Vision**
- Registered citizens can create new governance proposals
- Set voting duration and execution delay periods
- Proposals require majority approval to become law

### 4. 🗳️ **Cast Your Secret Vote**
- Vote on active proposals with complete privacy
- Your choice is encrypted using FHE magic and remains invisible
- Results are revealed automatically when the voting period concludes

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

## 🛠️ The Royal Arsenal

### 🎨 **Frontend Kingdom**
- **React 18**: The crown jewel of modern web development
- **TypeScript**: Type-safe coding for the royal court
- **Vite**: Lightning-fast build system
- **Tailwind CSS**: Beautiful, responsive styling
- **shadcn/ui**: Premium component library

### ⛓️ **Blockchain Empire**
- **Ethereum (Sepolia)**: The royal blockchain
- **Wagmi**: Battle-tested Ethereum interactions
- **RainbowKit**: Multi-wallet connectivity
- **Zama FHE Library**: The magic of homomorphic encryption
- **Solidity ^0.8.24**: Smart contract language

### 🚀 **Deployment Throne**
- **Vercel**: Global edge deployment platform

## 🤝 Join the Royal Court

We welcome contributions from developers who share our vision of privacy-first governance!

1. **Fork the Kingdom** - Create your own copy of the repository
2. **Create a Feature Branch** - `git checkout -b feature/royal-enhancement`
3. **Commit Your Changes** - `git commit -m 'Add royal enhancement'`
4. **Push to Your Branch** - `git push origin feature/royal-enhancement`
5. **Open a Pull Request** - Submit your contribution for review

## 📄 Royal Decree

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 The Royal Links

- **🏰 Live Demo**: [Deploy to Vercel](#)
- **📜 Smart Contract**: [View on Sepolia Etherscan](#)
- **📚 Documentation**: [FHE Governance Guide](#)

## ⚠️ Royal Disclaimer

This is a demonstration project for educational purposes. The smart contract has not been audited and should not be used in production without proper security review.

---

<div align="center">

**👑 Built with ❤️ using FHE technology for a more private and secure future of governance 👑**

*"In the Parliament of the Future, Privacy Reigns Supreme"*

</div>
