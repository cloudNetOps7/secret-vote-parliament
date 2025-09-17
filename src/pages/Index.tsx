import ParliamentHeader from '@/components/ParliamentHeader';
import WalletConnect from '@/components/WalletConnect';
import GovernanceProposal from '@/components/GovernanceProposal';
import FantasyBanners from '@/components/FantasyBanners';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Parliament Header */}
      <ParliamentHeader />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Wallet Connection */}
        <WalletConnect />
        
        {/* Main Governance Content */}
        <GovernanceProposal />
        
        {/* Fantasy Banners */}
        <FantasyBanners />
      </div>
    </div>
  );
};

export default Index;
