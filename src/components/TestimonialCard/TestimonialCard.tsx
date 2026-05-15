import React from 'react';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  name: string;
  text: string;
  service: string;
  rating?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, text, service, rating = 5 }) => {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>
      <p className={styles.text}>"{text}"</p>
      <div className={styles.authorInfo}>
        <span className={styles.name}>{name}</span>
        <span className={styles.service}>{service}</span>
      </div>
    </div>
  );
};
