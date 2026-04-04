import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openQuickChat } from '@/utils/whatsapp';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  defaultMessage = "Hi Naitik! I'd like to discuss a project with you. 👋"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    openQuickChat(defaultMessage);
    setShowTooltip(false);
  };

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Tooltip */}
        {showTooltip && (
          <div className="hidden md:block bg-surface border border-border rounded-lg shadow-lg p-3 max-w-xs relative animate-bounce-in">
            <button
              onClick={handleCloseTooltip}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:bg-surface transition-colors"
              aria-label="Close tooltip"
            >
              <X size={14} className="text-text-secondary" />
            </button>
            <p className="text-sm text-text-primary font-medium mb-1">
              Have a question?
            </p>
            <p className="text-xs text-text-secondary">
              Click here to chat with me on WhatsApp!
            </p>
          </div>
        )}

        {/* WhatsApp Button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce-in"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          
          {/* Icon */}
          <MessageCircle 
            className="relative text-white transition-transform duration-300 group-hover:scale-110" 
            size={28}
          />

          {/* Notification badge (optional) */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-background">
            1
          </span>
        </button>
      </div>

      {/* Hover message (desktop only) */}
      {isHovered && !showTooltip && (
        <div className="hidden md:block fixed bottom-6 right-24 z-40 bg-surface border border-border rounded-lg shadow-lg px-4 py-2 animate-fade-in">
          <p className="text-sm font-medium whitespace-nowrap">
            Chat on WhatsApp
          </p>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
