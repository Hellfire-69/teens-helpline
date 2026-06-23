import React from 'react';
import { H2, P } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Phone } from 'lucide-react';

export const CrisisOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-surface border border-red-500/20 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <H2 className="mb-4 text-text-heading">You are not alone.</H2>
        <P className="text-text-primary mb-8">
          It sounds like you might be going through a really difficult time right now. Please reach out to someone who can help immediately.
        </P>
        
        <div className="space-y-4">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2" size="lg">
            <Phone className="w-5 h-5" />
            Call 988
          </Button>
          <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50" size="lg">
            Text HOME to 741741
          </Button>
        </div>
      </div>
    </div>
  );
};
