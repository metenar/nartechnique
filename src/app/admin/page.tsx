"use client";

import React, { useState } from 'react';
import { Button } from '@/components/Button/Button';
import styles from './admin.module.css';

export default function AdminPage() {
  // Gallery State
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [galleryStatus, setGalleryStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Review State
  const [reviewName, setReviewName] = useState('');
  const [reviewService, setReviewService] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewStatus, setReviewStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !altText) {
      setGalleryStatus({ type: 'error', message: 'Please select a file and provide alt text.' });
      return;
    }

    setIsUploading(true);
    setGalleryStatus(null);

    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadRes.ok) throw new Error('Upload failed');
      const { filePath } = await uploadRes.json();

      // 2. Save to content.json
      const contentRes = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'gallery',
          data: { src: filePath, alt: altText }
        })
      });

      if (!contentRes.ok) throw new Error('Failed to save to content.json');

      setGalleryStatus({ type: 'success', message: 'Image successfully added to gallery!' });
      setFile(null);
      setAltText('');
    } catch (error) {
      setGalleryStatus({ type: 'error', message: 'An error occurred during upload.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewService || !reviewText) {
      setReviewStatus({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }

    setIsSubmittingReview(true);
    setReviewStatus(null);

    try {
      const contentRes = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'review',
          data: { 
            name: reviewName, 
            service: reviewService, 
            text: reviewText, 
            rating: reviewRating 
          }
        })
      });

      if (!contentRes.ok) throw new Error('Failed to save review');

      setReviewStatus({ type: 'success', message: 'Review successfully added!' });
      setReviewName('');
      setReviewService('');
      setReviewText('');
      setReviewRating('5');
    } catch (error) {
      setReviewStatus({ type: 'error', message: 'An error occurred saving the review.' });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <p style={{marginBottom: '2rem'}}>Use this dashboard locally to add content to your website before deploying.</p>

      <div className={styles.dashboardGrid}>
        
        {/* Upload Image Card */}
        <div className={styles.card}>
          <h2>Add Gallery Image</h2>
          <form onSubmit={handleImageUpload}>
            <div className={styles.formGroup}>
              <label htmlFor="imageFile">Select Image</label>
              <input 
                type="file" 
                id="imageFile" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className={styles.fileInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="altText">Description (Alt Text)</label>
              <input 
                type="text" 
                id="altText" 
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g., Clean TV mounting above fireplace"
                className={styles.input}
              />
            </div>
            <Button type="submit" fullWidth disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </Button>

            {galleryStatus && (
              <div className={`${styles.statusMessage} ${styles[galleryStatus.type]}`}>
                {galleryStatus.message}
              </div>
            )}
          </form>
        </div>

        {/* Add Review Card */}
        <div className={styles.card}>
          <h2>Add Customer Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="reviewerName">Customer Name</label>
              <input 
                type="text" 
                id="reviewerName" 
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="e.g., John D."
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reviewService">Service Provided</label>
              <input 
                type="text" 
                id="reviewService" 
                value={reviewService}
                onChange={(e) => setReviewService(e.target.value)}
                placeholder="e.g., TV Mounting"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reviewRating">Rating</label>
              <select 
                id="reviewRating"
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                className={styles.select}
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reviewText">Review Text</label>
              <textarea 
                id="reviewText" 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did the customer say?"
                className={styles.textarea}
              />
            </div>
            <Button type="submit" fullWidth disabled={isSubmittingReview}>
              {isSubmittingReview ? 'Saving...' : 'Save Review'}
            </Button>

            {reviewStatus && (
              <div className={`${styles.statusMessage} ${styles[reviewStatus.type]}`}>
                {reviewStatus.message}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
