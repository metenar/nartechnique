import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <h3>Nar Technique</h3>
          <p>Professional, reliable, and clean handyman and installation services in the Bay Area.</p>
          <p><strong>Call or Text:</strong><br/><a href="tel:6507409472">(650) 740-9472</a></p>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com/nartechnique" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://instagram.com/nartechnique" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://linkedin.com/company/nartechnique" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://youtube.com/@nartechnique" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://x.com/nartechnique" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
            </a>
          </div>
        </div>
        
        <div className={styles.column}>
          <h3>Service Areas</h3>
          <ul className={styles.multiColumnLinks}>
            <li><Link href="/services/handyman-san-mateo">San Mateo</Link></li>
            <li><Link href="/services/handyman-foster-city">Foster City</Link></li>
            <li><Link href="/services/handyman-burlingame">Burlingame</Link></li>
            <li><Link href="/services/handyman-belmont">Belmont</Link></li>
            <li><Link href="/services/handyman-redwood-city">Redwood City</Link></li>
            <li><Link href="/services/handyman-san-carlos">San Carlos</Link></li>
            <li><Link href="/services/handyman-palo-alto">Palo Alto</Link></li>
            <li><Link href="/services/handyman-fremont">Fremont</Link></li>
            <li><Link href="/services/handyman-newark">Newark</Link></li>
            <li><Link href="/services/handyman-hayward">Hayward</Link></li>
            <li><Link href="/services/handyman-oakland">Oakland</Link></li>
            <li><Link href="/services/handyman-san-francisco">San Francisco</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Primary Services</h3>
          <ul className={styles.multiColumnLinks}>
            <li><Link href="/services/tv-mounting-san-mateo">TV Mounting</Link></li>
            <li><Link href="/services/appliance-installation-san-mateo">Appliance Install</Link></li>
            <li><Link href="/services/faucet-replacement-san-mateo">Faucet Replace</Link></li>
            <li><Link href="/services/light-fixture-installation-san-mateo">Lighting Install</Link></li>
            <li><Link href="/services/furniture-assembly-san-mateo">Furniture Assembly</Link></li>
            <li><Link href="/services/art-installation-san-mateo">Art & Mirrors</Link></li>
            <li><Link href="/services/smart-home-installation-san-mateo">Smart Home</Link></li>
            <li><Link href="/services/water-treatment-installation-san-mateo">Water Systems</Link></li>
            <li><Link href="/services/window-ac-installation-san-mateo">AC Installation</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} Nar Technique. All rights reserved.
      </div>
    </footer>
  );
};
