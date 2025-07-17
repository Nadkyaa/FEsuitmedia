// app/ideas/components/Header.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // <-- Import Image component

import styles from './Header.module.css';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll down
        setIsHidden(true);
      } else {
        // Scroll up
        setIsHidden(false);
      }

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${isHidden ? styles.hidden : ''} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          {/* Ganti teks 'Suitmedia' dengan komponen Image */}
          <Link href="/logo.png"> {/* Opsional: Bungkus logo dengan Link ke halaman utama */}
            <Image
              src="/logo.png" // <-- Ganti dengan path ke file logo Anda di folder public
              alt="Suitmedia Logo"
              width={120} // <-- Tentukan lebar logo Anda
              height={30} // <-- Tentukan tinggi logo Anda
              priority // Opsional: Untuk memuat logo lebih awal jika penting
            />
          </Link>
        </div>
        <ul className={styles.menu}>
          <li><Link href="/work" className={pathname === '/work' ? styles.active : ''}>Work</Link></li>
          <li><Link href="/about" className={pathname === '/about' ? styles.active : ''}>About</Link></li>
          <li><Link href="/services" className={pathname === '/services' ? styles.active : ''}>Services</Link></li>
          <li className={pathname === '/ideas' ? styles.active : ''}><Link href="/ideas">Ideas</Link></li>
          <li><Link href="/careers" className={pathname === '/careers' ? styles.active : ''}>Careers</Link></li>
          <li><Link href="/contact" className={pathname === '/contact' ? styles.active : ''}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}