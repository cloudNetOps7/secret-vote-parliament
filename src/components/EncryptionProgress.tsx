import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { VotingState } from '@/hooks/useVoting';

interface EncryptionProgressProps {
  votingState: VotingState;
  isVisible: boolean;
}

const EncryptionProgress = ({ votingState, isVisible }: EncryptionProgressProps) => {
  if (!isVisible) return null;

  const { isEncrypting, isSubmitting, encryptionProgress, currentStep, error } = votingState;

  const getStatusIcon = () => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isEncrypting || isSubmitting) return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    if (encryptionProgress === 100) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <Lock className="h-5 w-5 text-mystical-gold" />;
  };

  const getStatusColor = () => {
    if (error) return 'destructive';
    if (isEncrypting || isSubmitting) return 'default';
    if (encryptionProgress === 100) return 'secondary';
    return 'outline';
  };

  const getStatusText = () => {
    if (error) return 'Encryption Failed';
    if (isEncrypting) return 'Encrypting Vote';
    if (isSubmitting) return 'Submitting to Blockchain';
    if (encryptionProgress === 100) return 'Encryption Complete';
    return 'Ready to Encrypt';
  };

  return (
    <Card className="royal-card p-6 border-mystical-gold/30">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-mystical-gold/20 to-royal-purple/20 rounded-lg">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-lg">FHE Encryption Process</h3>
              <p className="text-muted-foreground text-sm">Securing your vote with homomorphic encryption</p>
            </div>
          </div>
          <Badge variant={getStatusColor() as any} className="gap-1">
            <Crown className="h-3 w-3" />
            {getStatusText()}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Encryption Progress</span>
            <span className="font-medium">{encryptionProgress}%</span>
          </div>
          <Progress 
            value={encryptionProgress} 
            className="h-2"
          />
        </div>

        {/* Current Step */}
        {currentStep && (
          <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
            <Loader2 className="h-4 w-4 text-mystical-gold animate-spin" />
            <span className="text-sm font-medium">{currentStep}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}

        {/* Encryption Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground">Encryption Type:</span>
            <span className="font-medium">Fully Homomorphic</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Security Level:</span>
            <span className="font-medium text-green-500">Military Grade</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Privacy:</span>
            <span className="font-medium text-blue-500">Zero-Knowledge</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground">Verification:</span>
            <span className="font-medium text-purple-500">ZK Proof</span>
          </div>
        </div>

        {/* Security Features */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium mb-2">Security Features Active:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1">
              <Lock className="h-3 w-3" />
              FHE Encryption
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Crown className="h-3 w-3" />
              ZK Proofs
            </Badge>
            <Badge variant="outline" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Immutable
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EncryptionProgress;
