import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail } = FiIcons;

const FloatingButtons = () => {
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const phoneNumber = '605 786 099';

  const handleContactClick = () => {
    // Get contact section and form
    const contactSection = document.getElementById('contact');
    const contactForm = document.querySelector('#contact form');
    
    // Scroll to contact section
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // On mobile, focus on the form's first input after scrolling
    if (window.innerWidth < 768) {
      // Add a small delay to ensure scrolling completes first
      setTimeout(() => {
        // Focus on the first input field in the form
        const firstInput = contactForm?.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* Phone Button with Tooltip */}
      <div className="relative">
        <AnimatePresence>
          {showPhoneTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
            >
              <div className="font-semibold text-[#002999]">{phoneNumber}</div>
              {/* Arrow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rotate-45 w-2 h-2 bg-white"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.a
          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setShowPhoneTooltip(true)}
          onMouseLeave={() => setShowPhoneTooltip(false)}
          className="bg-[#002999] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#001f7a] transition-colors"
        >
          <SafeIcon icon={FiPhone} className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Contact Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleContactClick}
        className="bg-[#002999] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#001f7a] transition-colors"
      >
        <SafeIcon icon={FiMail} className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;