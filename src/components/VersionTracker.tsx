import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { versionHistory, VersionEntry } from '@/data/versionHistory';

const VersionTracker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentVersion = versionHistory[0];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs text-gray-500 hover:text-gray-400 transition-colors cursor-pointer z-40 px-2 py-1 rounded hover:bg-muted/50"
        title="Version info"
      >
        v{currentVersion.version}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-2xl max-h-[80vh] overflow-y-auto mx-auto px-4 sm:px-0">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl">Version History</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 sm:space-y-6">
            {versionHistory.map((entry: VersionEntry) => (
              <div key={entry.version} className="border-l-2 border-primary pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    Version {entry.version}
                  </h3>
                  {entry.version === currentVersion.version && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded w-fit">
                      Current
                    </span>
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{entry.date}</p>
                
                <div className="space-y-1 sm:space-y-2">
                  {entry.changes.map((change: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      <span className="text-xs sm:text-sm text-foreground">{change}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VersionTracker;
