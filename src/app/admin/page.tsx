"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import styles from './admin.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminPage() {
  // Existing state
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [galleryStatus, setGalleryStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [reviewName, setReviewName] = useState('');
  const [reviewService, setReviewService] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewStatus, setReviewStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // New state
  const [contentData, setContentData] = useState<{ gallery: any[], reviews: any[] }>({ gallery: [], reviews: [] });
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const cRes = await fetch('/api/content');
      if (cRes.ok) setContentData(await cRes.json());
      
      const aRes = await fetch('/api/analytics');
      if (aRes.ok) {
        const aData = await aRes.json();
        const chartData = Object.keys(aData).map(date => ({
          date,
          newVisitors: aData[date].newVisitors,
          totalVisits: aData[date].totalVisits
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setAnalyticsData(chartData);
      }
    } catch (e) {
      console.error('Failed to load dashboard data', e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !altText) {
      setGalleryStatus({ type: 'error', message: 'Please select a file and provide alt text.' });
      return;
    }

    setIsUploading(true);
    setGalleryStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadRes.ok) throw new Error('Upload failed');
      const { filePath } = await uploadRes.json();

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
      fetchDashboardData();
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
      fetchDashboardData();
    } catch (error) {
      setReviewStatus({ type: 'error', message: 'An error occurred saving the review.' });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleDelete = async (id: string, type: 'review' | 'gallery') => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`/api/content?id=${id}&type=${type}`, { method: 'DELETE' });
      if (res.ok) {
        const updated = await res.json();
        setContentData(updated.data);
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <p style={{marginBottom: '2rem'}}>Manage your site content and view visitor statistics.</p>

      {/* Analytics Section */}
      <div className={styles.card} style={{marginBottom: '3rem'}}>
        <h2>Visitor Statistics</h2>
        {analyticsData.length === 0 ? (
          <p>No visitor data available yet.</p>
        ) : (
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalVisits" name="Total Visits" stroke="var(--color-primary)" strokeWidth={3} />
                <Line type="monotone" dataKey="newVisitors" name="New Visitors" stroke="#f97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

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

      {/* Manage Content Section */}
      <div className={styles.section}>
        <h2 className={styles.title} style={{fontSize: '2rem', border: 'none'}}>Manage Content</h2>
        
        <div className={styles.dashboardGrid}>
          <div className={styles.card}>
            <h2>Gallery Images ({contentData.gallery.length})</h2>
            <div className={styles.list}>
              {contentData.gallery.map(img => (
                <div key={img.id} className={styles.listItem}>
                  <div className={styles.flexRow}>
                    {/* Note: In a real app we'd use next/image here, but an img tag is fine for admin preview */}
                    <img src={img.src} alt={img.alt} className={styles.imgPreview} />
                    <div className={styles.listItemContent}>
                      <p style={{fontWeight: 600, fontSize: '0.9rem'}}>{img.alt}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(img.id, 'gallery')} className={styles.deleteBtn}>Delete</button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2>Customer Reviews ({contentData.reviews.length})</h2>
            <div className={styles.list}>
              {contentData.reviews.map(rev => (
                <div key={rev.id} className={styles.listItem}>
                  <div className={styles.listItemContent}>
                    <p style={{fontWeight: 600}}>{rev.name}</p>
                    <p style={{fontSize: '0.85rem', color: '#666'}}>{rev.service} - {rev.rating} Stars</p>
                    <p style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>&quot;{rev.text.substring(0, 50)}...&quot;</p>
                  </div>
                  <button onClick={() => handleDelete(rev.id, 'review')} className={styles.deleteBtn}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
