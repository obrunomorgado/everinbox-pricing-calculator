
import { useEffect, useRef } from 'react';

export const useLandingAnimations = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToNextSection = (currentIndex: number) => {
    const nextSection = sectionsRef.current[currentIndex + 1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { sectionsRef, scrollToNextSection };
};
