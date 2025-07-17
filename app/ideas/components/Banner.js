
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Banner.module.css';

export default function Banner() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imageTransform = `translateY(${scrollPosition * 0.4}px)`;
  const contentTransform = `translateY(${scrollPosition * 0.2}px)`;

  const bannerImageUrl = '/banner.jpg';
  return (
    <section className={styles.banner}>
      <div className={styles.bannerImage} style={{ transform: imageTransform }}>
        <Image
          src={bannerImageUrl}
          alt="Banner background" 
          fill
          sizes="100vw"
          priority 
        />
      </div>
      <div className={styles.bannerContent} style={{ transform: contentTransform }}>
        <h1>Ideas</h1>
        <p>Where all our great things begin</p>
      </div>
    </section>
  );
}