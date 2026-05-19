"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../Button/Button';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image 
          src="/logo.svg" 
          alt="Nar Technique Logo" 
          width={150} 
          height={40} 
          priority
        />
      </Link>

      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
        <Link href="/#services" className={styles.navLink} replace onClick={() => setIsMenuOpen(false)}>Services</Link>
        <Link href="/#gallery" className={styles.navLink} replace onClick={() => setIsMenuOpen(false)}>Gallery</Link>
        <Link href="/#reviews" className={styles.navLink} replace onClick={() => setIsMenuOpen(false)}>Reviews</Link>
        <Button href="tel:6507409472" variant="primary">Call: (650) 740-9472</Button>
      </nav>

      <button 
        className={styles.mobileMenuBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </header>
  );
};
