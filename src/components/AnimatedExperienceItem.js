import React, { useEffect, useRef } from 'react';

const AnimatedExperienceItem = ({ children }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const currentElement = itemRef.current;
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
      currentElement.style.transform = 'translateY(30px)';
      currentElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out 0.1s';
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return <div ref={itemRef}>{children}</div>;
};

export default AnimatedExperienceItem;
