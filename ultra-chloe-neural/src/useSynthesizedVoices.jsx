import { useState, useEffect } from 'react';

const useSynthesizedVoices = () => {
  const [isSynthesized, setIsSynthesized] = useState(false);

  useEffect(() => {
    // Check if the browser supports the Speech Synthesis API
    if ('speechSynthesis' in window) {
      // Check if the browser supports synthesized voices
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setIsSynthesized(true);
      }
    }
  }, []);

  return isSynthesized;
};

export default useSynthesizedVoices;