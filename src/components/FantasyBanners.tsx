import { Flag, Star, Sword, Shield } from 'lucide-react';
import fantasyBanners from '@/assets/fantasy-banners.png';

const FantasyBanners = () => {
  const banners = [
    { icon: Shield, color: 'text-royal-purple', label: 'Guild of Shadows' },
    { icon: Sword, color: 'text-mystical-gold', label: 'Order of Light' },
    { icon: Star, color: 'text-parliament-blue', label: 'Mystic Council' },
    { icon: Flag, color: 'text-royal-purple-light', label: 'Dragon Riders' },
  ];

  return (
    <div className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mystical-text mb-2">United Guilds</h2>
          <p className="text-muted-foreground">Representatives from across the realm</p>
        </div>
        
        {/* Fantasy Banner Image */}
        <div className="flex justify-center mb-8">
          <img 
            src={fantasyBanners} 
            alt="Fantasy guild banners" 
            className="h-32 object-contain banner-glow rounded-lg"
          />
        </div>
        
        {/* Guild Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {banners.map((banner, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-3 p-4 royal-card"
            >
              <div className="p-3 bg-gradient-to-br from-mystical-gold/10 to-royal-purple/10 rounded-full">
                <banner.icon className={`h-8 w-8 ${banner.color}`} />
              </div>
              <span className="text-sm font-semibold text-center">{banner.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FantasyBanners;