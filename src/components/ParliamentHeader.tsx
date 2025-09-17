import { Crown, Shield, Scroll } from 'lucide-react';
import parliamentHall from '@/assets/parliament-hall.jpg';

const ParliamentHeader = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${parliamentHall})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>
      
      {/* Content */}
      <div className="relative parliament-hall min-h-[400px] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          {/* Crown Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-gradient-to-br from-mystical-gold/20 to-royal-purple/20 rounded-full banner-glow">
              <Crown className="h-16 w-16 text-mystical-gold" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="mystical-text">Govern Your World</span>
            <br />
            <span className="text-foreground">with Privacy</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Participate in encrypted governance decisions where your vote remains private until the final tally, 
            preventing guild coercion and ensuring true democratic participation.
          </p>
          
          {/* Feature Icons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            <div className="flex items-center gap-3 text-mystical-gold">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">Encrypted Voting</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="flex items-center gap-3 text-mystical-gold">
              <Scroll className="h-6 w-6" />
              <span className="font-semibold">Transparent Results</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-border" />
            <div className="flex items-center gap-3 text-mystical-gold">
              <Crown className="h-6 w-6" />
              <span className="font-semibold">Democratic Governance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParliamentHeader;