import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import styles from "./gallery.module.css";
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
  title: 'Project Gallery | Nar Technique',
  description: 'View photos of our recent handyman, TV mounting, and installation projects across the Bay Area.',
};

export default async function GalleryPage() {
  const content = await getContent();

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Gallery</h1>
        <p className={styles.subtitle}>
          Browse our portfolio of completed projects. From TV mounting to complex smart home installations, 
          we take pride in delivering clean, professional results every time.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {content.gallery.map((img: any) => (
          <div key={img.id} className={styles.galleryItem}>
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>Ready to start your project?</h2>
        <Button href="tel:6507409472" size="large">Call Now to Book</Button>
      </div>
    </main>
  );
}
