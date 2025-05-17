import React, { useEffect, useRef } from 'react';

const AnimatedExperienceItem = ({ children }) => {
  const itemRef = useRef(null);

  useEffect(() => {
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

    if (itemRef.current) {
      itemRef.current.style.opacity = '0';
      itemRef.current.style.transform = 'translateY(30px)';
      itemRef.current.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out 0.1s';
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return <div ref={itemRef}>{children}</div>;
};

export default AnimatedExperienceItem;
