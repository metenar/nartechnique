import React from 'react';
import Link from 'next/link';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, href }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link href={href} className={styles.link}>
        Learn more <span>&rarr;</span>
      </Link>
    </div>
  );
};
