import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from '@/components/ui/card';
import { Crown, Lock } from 'lucide-react';

const WalletConnect = () => {
  return (
    <Card className="royal-card p-6 border-mystical-gold/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-mystical-gold/20 to-royal-purple/20 rounded-lg">
            <Crown className="h-6 w-6 text-mystical-gold" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Secret Vote Parliament</h3>
            <p className="text-muted-foreground text-sm">Connect your wallet to participate in FHE governance</p>
          </div>
        </div>
        
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                    <Lock className="h-4 w-4 text-mystical-gold" />
                    <span className="text-sm">FHE Protected</span>
                  </div>
          <ConnectButton 
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default WalletConnect;