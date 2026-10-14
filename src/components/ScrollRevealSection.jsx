import React, { useEffect, useRef, useState } from 'react';

export default function ScrollRevealSection({
  id,
  className = '',
  children,
  ...props
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`page-section section-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

