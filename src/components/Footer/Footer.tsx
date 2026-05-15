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
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} Nar Technique. All rights reserved.
      </div>
    </footer>
  );
};
