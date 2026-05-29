import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import MapWrapper from "@/components/ServiceMap/MapWrapper";
import { Button } from "@/components/Button/Button";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard/TestimonialCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

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

export default async function Home() {
  const content = await getContent();

  return (
    <>
      {/* Sticky Mobile Call CTA */}
      <a href="tel:6507409472" className={styles.stickyMobileCall}>
        Call Now: (650) 740-9472
      </a>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Professional Handyman & Installation Services in San Mateo & Bay Area</h1>
          <p className={styles.heroSubtitle}>
            Reliable, clean, and detail-focused handyman services specializing in TV mounting, appliance installation, lighting, faucet replacement, furniture assembly, and home repairs.
          </p>
          <div className={styles.heroButtons}>
            <Button href="tel:6507409472" size="large">Call Now</Button>
            <Button href="tel:6507409472" variant="outline" size="large">Get Free Estimate</Button>
            <Button href="sms:6507409472" variant="secondary" size="large">Text Photos for Quote</Button>
          </div>
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}><span className={styles.trustIcon}>✓</span> 500+ Completed Jobs</div>
            <div className={styles.trustItem}><span className={styles.trustIcon}>✓</span> 5-Star Rated</div>
            <div className={styles.trustItem}><span className={styles.trustIcon}>✓</span> Same-Day Availability</div>
            <div className={styles.trustItem}><span className={styles.trustIcon}>✓</span> Professional & Clean Work</div>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/hero_handyman_tv_clean.png"
            alt="Handyman mounting a TV in a modern home"
            fill
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>Expert installation and repair services for your home or business.</p>
        </div>
        <div className={styles.servicesGrid}>
          <ServiceCard
            title="TV Mounting"
            description="Professional TV wall mounting with wire concealment. Safe, secure, and perfectly level."
            icon="📺"
            href="/services/tv-mounting-san-mateo"
          />
          <ServiceCard
            title="Appliance Installation"
            description="Expert installation for washers, dryers, dishwashers, and built-in microwaves."
            icon="🔌"
            href="/services/appliance-installation-san-mateo"
          />
          <ServiceCard
            title="Faucet/Sink & Toilet Replacement"
            description="Quick and clean replacement of bathroom and kitchen fixtures/Sinks without the plumbing premium."
            icon="🚰"
            href="/services/faucet-replacement-san-mateo"
          />
          <ServiceCard
            title="Lighting & Ceiling Fans"
            description="Safe installation of chandeliers, pendant lights, and ceiling fans."
            icon="💡"
            href="/services/light-fixture-installation-san-mateo"
          />
          <ServiceCard
            title="Furniture Assembly"
            description="Fast and correct assembly for IKEA, Wayfair, and custom furniture pieces."
            icon="🪑"
            href="/services/furniture-assembly-san-mateo"
          />
          <ServiceCard
            title="Art & Mirror Installation"
            description="Professional picture hanging, heavy mirror mounting, and perfectly leveled gallery walls."
            icon="🖼️"
            href="/services/art-installation-san-mateo"
          />
          <ServiceCard
            title="Smart Home Setup"
            description="Installation of smart thermostats, doorbells, cameras, and locks."
            icon="🏠"
            href="/services/smart-home-installation-san-mateo"
          />
          <ServiceCard
            title="Water Treatment Systems"
            description="Professional installation or replacement of under-sink water filters and RO units."
            icon="💧"
            href="/services/water-treatment-installation-san-mateo"
          />
          <ServiceCard
            title="Window / Portable AC Install"
            description="Secure, perfectly sealed, and leveled installation for window and portable air conditioning units."
            icon="❄️"
            href="/services/window-ac-installation-san-mateo"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Nar Technique</h2>
          <p className={styles.sectionSubtitle}>We bring professional tech-industry standards to home services.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✨</div>
            <div>
              <h3>Clean & Professional Work</h3>
              <p>We wear shoe covers, lay down drop cloths, and leave your home cleaner than we found it.</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💬</div>
            <div>
              <h3>Clear Communication</h3>
              <p>We respond quickly, show up when we say we will, and explain everything clearly.</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⏱️</div>
            <div>
              <h3>On-Time Service</h3>
              <p>Your time is valuable. We pride ourselves on punctuality and efficient work.</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔍</div>
            <div>
              <h3>Attention to Detail</h3>
              <p>We don't cut corners. From level TVs to perfectly caulked fixtures, the details matter.</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💰</div>
            <div>
              <h3>Honest Pricing</h3>
              <p>No hidden fees or surprise charges. We provide clear estimates before starting any work.</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🛠️</div>
            <div>
              <h3>Reliable Problem Solving</h3>
              <p>If there's an unexpected issue, we have the technical skills to solve it correctly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Projects</h2>
          <p className={styles.sectionSubtitle}>See the quality of our workmanship firsthand.</p>
        </div>
        <div className={styles.galleryGrid}>
          {content.gallery.slice(0, 6).map((img: any) => (
            <div key={img.id} className={styles.galleryItem}>
              <Image src={img.src} alt={img.alt} fill />
            </div>
          ))}
        </div>
        <div className={styles.readMoreContainer}>
          <Button href="/gallery" variant="outline">View All Projects</Button>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Customer Reviews</h2>
          <p className={styles.sectionSubtitle}>Don't just take our word for it.</p>
        </div>
        <div className={styles.reviewsGrid}>
          {(() => {
            const uniqueServiceReviews: any[] = [];
            const seenServices = new Set();
            
            // First pass: add one review per service to showcase variety
            for (const review of content.reviews) {
              if (!seenServices.has(review.service) && uniqueServiceReviews.length < 6) {
                uniqueServiceReviews.push(review);
                seenServices.add(review.service);
              }
            }
            
            // Second pass: if we have less than 6, fill the rest with remaining reviews
            if (uniqueServiceReviews.length < 6) {
              for (const review of content.reviews) {
                if (!uniqueServiceReviews.includes(review) && uniqueServiceReviews.length < 6) {
                  uniqueServiceReviews.push(review);
                }
              }
            }

            return uniqueServiceReviews.map((review: any) => (
              <TestimonialCard
                key={review.id}
                name={review.name}
                service={review.service}
                text={review.text}
                rating={review.rating}
              />
            ));
          })()}
        </div>
        <div className={styles.readMoreContainer}>
          <Button href="/reviews" variant="outline">Read All Reviews</Button>
        </div>
      </section>

      {/* Service Area */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Areas We Serve</h2>
          <p className={styles.sectionSubtitle}>Providing professional handyman services throughout the Peninsula and Bay Area.</p>
        </div>
        <MapWrapper />
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Need a Reliable Handyman?</h2>
        <p className={styles.ctaSubtitle}>Call or text today for fast, professional service. We are ready to help with your next project.</p>
        <div className={styles.ctaButtons}>
          <Button href="tel:6507409472" variant="outline" size="large" style={{ borderColor: 'white', color: 'white' }}>Call Now</Button>
          <Button href="sms:6507409472" size="large">Request Estimate</Button>
        </div>
      </section>
    </>
  );
}
