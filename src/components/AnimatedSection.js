import React, { useEffect, useRef } from 'react';

const AnimatedSection = ({ children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentElement = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentElement) {
      currentElement.style.opacity = '0';
      currentElement.style.transform = 'translateY(40px)';
      currentElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out 0.2s';
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return <div ref={sectionRef}>{children}</div>;
};

export default AnimatedSection;
