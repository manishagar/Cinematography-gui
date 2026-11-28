import React, { useEffect, useState } from 'react';
import { fetchBannerImage } from './bannerApi';

export default function BannerCard({ banner, admin = false }) {
  const [image, setImage] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setImage(''); setFailed(false);
    if (banner.bannerType !== 'IMAGE' || !banner.imageUrl) return;
    const controller = new AbortController();
    let objectUrl;
    setImage(''); setFailed(false);
    fetchBannerImage(banner.imageUrl, admin, controller.signal)
      .then(blob => {
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob); setImage(objectUrl);
      })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => { controller.abort(); if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [banner.bannerType, banner.imageUrl, admin]);
  return <article className="svb-card" style={banner.bannerType === 'TEXT' ? { backgroundColor: banner.backgroundColor || '#0f172a', color: banner.textColor || '#ffffff' } : { backgroundColor: '#0f172a', color: '#ffffff' }}>
    {banner.bannerType === 'IMAGE' && <div className="svb-card-image">
      {image ? <img src={image} alt={banner.altText || banner.title} /> : <p>{failed || !banner.imageUrl ? 'Image unavailable' : 'Loading image...'}</p>}
    </div>}
    <div className="svb-card-copy">
      <h3>{banner.title}</h3>
      {banner.subtitle && <p>{banner.subtitle}</p>}
    </div>
  </article>;
}
