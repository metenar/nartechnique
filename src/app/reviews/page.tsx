import fs from "fs/promises";
import path from "path";
import { TestimonialCard } from "@/components/TestimonialCard/TestimonialCard";
import styles from "./reviews.module.css";
import { Button } from "@/components/Button/Button";

// Function to fetch content
async function getContent() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load content.json', error);
    return { gallery: [], reviews: [] };
  }
}

export const metadata = {
  title: 'Customer Reviews | Nar Technique',
  description: 'Read reviews from our satisfied customers across the Bay Area for TV mounting, furniture assembly, and handyman services.',
};

export default async function ReviewsPage() {
  const content = await getContent();

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Customer Reviews</h1>
        <p className={styles.subtitle}>
          We take pride in delivering professional, clean, and reliable service. 
          Here's what our customers have to say about working with Nar Technique.
        </p>
      </div>

      <div className={styles.reviewsGrid}>
        {content.reviews.map((review: any) => (
          <TestimonialCard
            key={review.id}
            name={review.name}
            service={review.service}
            text={review.text}
            rating={review.rating}
          />
        ))}
      </div>

      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>Ready to experience our 5-star service?</h2>
        <Button href="tel:6507409472" size="large">Call Now to Book</Button>
      </div>
    </main>
  );
}
