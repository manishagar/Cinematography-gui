import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Stories', href: '#stories' },
  { label: 'Faqs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
    title: 'Magical wedding tales,',
    subtitle: 'crafted with love!',
  },
  {
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    title: 'Capturing Moments',
    subtitle: 'To last a lifetime',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    title: 'Forever begins with',
    subtitle: 'beautiful memories',
  },
]

const serviceCards = [
  {
    id: 1,
    title: 'Weddings',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Pre-Weddings',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    id: 3,
    title: 'Destination Weddings',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    id: 4,
    title: 'Wedding Filmer',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
]

const portfolioCards = [
  {
    title: 'Kavish & Renuka',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Arjun & Kanchan',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Mansi & Anshul',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Rohit & Supriya',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Deepak & Anjali',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Bridal Portraits',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
]

const filmCards = [
  {
    title: 'The Beautiful Union of Jyoti & Sumit',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/Ln9PJ7ZY9TM?autoplay=1',
  },
  {
    title: 'A Journey of Love: Ankush & Yamini',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/eQ5GymHs28w?autoplay=1',
  },
  {
    title: 'A Timeless Union: Aayushi & Sanchit',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/MU6fazulM5o?autoplay=1',
  },
  {
    title: 'Ansh Weds Bharti',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/v9UEcc8t7ks?autoplay=1',
  },
]

const testimonials = [
  {
    name: 'Ruchika & Harshit',
    text:
      'I can’t thank you enough. I made the best decision choosing you. Really full of emotions after seeing such perfect video.',
    tag: 'Best Decision',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Ankit & Aashina',
    text:
      'Choosing Balaji Photography for our wedding photoshoot was the best decision! The team was friendly, professional, and captured the real emotion beautifully.',
    tag: 'Very Calm Nature',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nitin & Preety',
    text:
      'Our pre-wedding shoot felt natural and magical. Balaji Photography brought our love story to life with stunning frames and a warm, creative process.',
    tag: 'I Highly Recommend',
    image:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
  },
]

const blogCards = [
  {
    title: 'Best Wedding Photographer in Dehradun, Uttarakhand',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Top 10 Pre-Wedding Shoot Ideas in 2024',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Why You Should Hire a Professional Photographer for Your Wedding',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
  {
    title: 'Best Haldi Ceremony Photographer in Uttrakhand',
    image:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    link: '#',
  },
]

const pageStyles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: 'Segoe UI', sans-serif; background: #fff; color: #1e1e1e; }
  a { text-decoration: none; }
  img { max-width: 100%; display: block; }

  .balaji-home {
    background: #fff;
    color: #1a1a1a;
  }

  .container {
    width: min(1200px, calc(100% - 32px));
    margin: 0 auto;
  }

  .site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(10, 10, 10, 0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 80px;
  }

  .logo img {
    max-height: 56px;
    width: auto;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
  }

  .nav a {
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.8;
  }

  .nav a:hover { opacity: 1; }

  .hero-slider {
    position: relative;
    width: 100%;
    min-height: 720px;
    overflow: hidden;
    background: #111;
  }

  .hero-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.8s ease;
    background-size: cover;
    background-position: center;
  }

  .hero-slide.active {
    opacity: 1;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(5,5,5,0.68), rgba(5,5,5,0.2));
  }

  .hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10%;
  }

  .hero-box {
    max-width: 650px;
    color: white;
  }

  .hero-box h2 {
    font-size: clamp(2.5rem, 5vw, 5rem);
    line-height: 1.05;
    margin: 0 0 18px;
    font-weight: 600;
    letter-spacing: -0.04em;
  }

  .hero-box h2 span {
    display: block;
    color: #d8b15d;
  }

  .hero-box .btn-row {
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 24px;
    border-radius: 999px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: 0.25s ease;
    border: 1px solid transparent;
  }

  .btn.primary {
    background: #d4af6a;
    color: #141414;
  }

  .btn.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 28px rgba(212,175,106,0.35);
  }

  .btn.secondary {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.35);
    color: white;
  }

  .marquee-wrap {
    background: #f1ead9;
    padding: 18px 0;
    border-top: 1px solid rgba(0,0,0,0.05);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .marquee {
    white-space: nowrap;
    overflow: hidden;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #171717;
  }

  .marquee span {
    display: inline-block;
    padding-right: 30px;
    animation: runText 18s linear infinite;
  }

  @keyframes runText {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }

  .section {
    padding: 90px 0;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 20px;
    margin-bottom: 40px;
  }

  .eyebrow {
    color: #b48a33;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .section-head h2 {
    font-size: clamp(2rem, 3vw, 3.20rem);
    margin: 8px 0 0;
    line-height: 1.1;
  }

  .section-head h2 span {
    color: #c49b42;
  }

  .services-grid, .portfolio-grid, .film-grid, .blog-grid, .testimonial-grid {
    display: grid;
    gap: 24px;
  }

  .services-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .service-card {
    background: #faf7f1;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 20px;
    overflow: hidden;
    transition: 0.25s ease;
  }

  .service-card:hover {
    box-shadow: 0 18px 40px rgba(15,15,15,0.08);
    transform: translateY(-3px);
  }

  .service-card img {
    width: 100%;
    height: 270px;
    object-fit: cover;
  }

  .service-card .content {
    padding: 20px 18px 22px;
  }

  .service-card h3 {
    margin: 0 0 10px;
    font-size: 1.4rem;
  }

  .service-card a {
    color: #171717;
    display: inline-block;
    margin-top: 8px;
    font-weight: 600;
  }

  .about-wrap {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 38px;
    align-items: center;
  }

  .about-image img {
    width: 100%;
    border-radius: 20px;
    min-height: 540px;
    object-fit: cover;
  }

  .about-text h6 {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #b48a33;
    margin-bottom: 12px;
  }

  .about-text p {
    font-size: 1.05rem;
    line-height: 1.9;
    color: #3a3a3a;
  }

  .about-more {
    margin-top: 22px;
  }

  .portfolio-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .portfolio-card {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    min-height: 360px;
    background: #111;
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  }

  .portfolio-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .portfolio-card:hover img {
    transform: scale(1.06);
  }

  .portfolio-caption {
    position: absolute;
    inset: auto 0 0 0;
    padding: 24px 18px 18px;
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.72));
    color: #fff;
  }

  .portfolio-caption h4 {
    margin: 0;
    font-size: 1.3rem;
  }

  .portfolio-caption span {
    opacity: 0.8;
    font-size: 0.9rem;
  }

  .video-highlight {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 24px;
    align-items: center;
  }

  .feature-video {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    min-height: 430px;
  }

  .feature-video img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-metrics {
    padding: 24px 18px;
    background: #faf7f1;
    border-radius: 18px;
    border: 1px solid rgba(0,0,0,0.05);
  }

  .video-metrics h3 {
    margin: 0 0 12px;
    font-size: 2rem;
  }

  .video-metrics p {
    margin: 0;
    line-height: 1.8;
    color: #3a3a3a;
  }

  .film-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 26px;
  }

  .film-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.06);
    transition: 0.2s ease;
  }

  .film-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 34px rgba(0,0,0,0.07);
  }

  .film-card img {
    width: 100%;
    height: 260px;
    object-fit: cover;
  }

  .film-card .content {
    padding: 16px 14px 18px;
  }

  .film-card h4 {
    margin: 0;
    font-size: 1.04rem;
    line-height: 1.5;
  }

  .testimonial-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .testimonial-card {
    background: #faf7f1;
    border-radius: 18px;
    padding: 26px 22px;
    border: 1px solid rgba(0,0,0,0.04);
  }

  .testimonial-card .person {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 18px;
  }

  .testimonial-card img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .testimonial-card p {
    margin: 0;
    line-height: 1.8;
    color: #2f2f2f;
  }

  .testimonial-tag {
    display: inline-block;
    margin-bottom: 12px;
    color: #b48a33;
    font-weight: 700;
    letter-spacing: 0.08em;
    font-size: 12px;
    text-transform: uppercase;
  }

  .blog-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .blog-card {
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.05);
    background: #fff;
    transition: 0.25s ease;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 30px rgba(0,0,0,0.07);
  }

  .blog-card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  .blog-card .content {
    padding: 16px 16px 18px;
  }

  .blog-card h4 {
    margin: 0;
    line-height: 1.5;
    font-size: 1.06rem;
  }

  .contact-wrap {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 30px;
    align-items: start;
  }

  .contact-box {
    padding: 30px 28px;
    background: #faf7f1;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.04);
  }

  .contact-box h3 {
    margin: 0 0 10px;
    font-size: 2.3rem;
    line-height: 1.1;
  }

  .contact-box .meta {
    margin-top: 18px;
    display: grid;
    gap: 14px;
  }

  .meta-item {
    display: flex;
    gap: 14px;
    align-items: start;
    color: #2a2a2a;
  }

  .meta-item .icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #111;
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 0.9rem;
  }

  .enquiry-form {
    background: #fff;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 22px;
    padding: 26px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.04);
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .input-group label {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #525252;
    font-weight: 700;
  }

  .input-group input,
  .input-group textarea,
  .input-group select {
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 12px;
    min-height: 50px;
    padding: 12px 14px;
    font: inherit;
    background: #fff;
  }

  .input-group textarea {
    min-height: 120px;
    resize: vertical;
  }

  .submit-btn {
    width: 100%;
    min-height: 52px;
    border: none;
    border-radius: 14px;
    background: #111;
    color: white;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .site-footer {
    background: #050505;
    color: #f5f0e9;
  }

  .footer-main {
    width: min(1400px, calc(100% - 48px));
    margin: 0 auto;
    padding: 40px 0 28px;
    display: grid;
    grid-template-columns: 1fr 1fr 0.8fr;
    align-items: stretch;
    background: #050505;
  }

  .footer-column {
    padding: 0 30px;
  }

  .footer-column h3,
  .footer-popular h3 {
    margin: 0 0 16px;
    color: #f4f0e8;
    font-size: 19px;
    letter-spacing: 0.02em;
    font-weight: 400;
    text-transform: uppercase;
    font-family: 'Segoe UI', sans-serif;
  }

  .footer-column h3::after {
    content: '';
    display: block;
    width: 56px;
    margin-top: 12px;
    border-bottom: 1px solid #dedad2;
  }

  .footer-connect p {
    max-width: 390px;
    margin: 0;
    color: #b8b8b8;
    font-size: 17px;
    line-height: 1.6;
    font-family: 'Segoe UI', sans-serif;
  }

  .footer-socials {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 28px;
    flex-wrap: wrap;
  }

  .footer-socials a {
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    font-weight: 700;
    font-family: Arial, sans-serif;
  }

  .footer-socials a:hover,
  .footer-quick-links a:hover {
    color: #d0a24f;
  }

  .footer-brand {
    border-left: 1px solid rgba(255,255,255,0.12);
    border-right: 1px solid rgba(255,255,255,0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    min-height: 200px;
  }

  .footer-logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 96px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .footer-logo img {
    width: min(220px, 70%);
    max-height: 80px;
    object-fit: contain;
    display: block;
  }

  .footer-copyright {
    padding-top: 18px;
    color: #f0ebdf;
    font-size: 15px;
    line-height: 1.7;
    font-family: 'Segoe UI', sans-serif;
  }

  .footer-copyright p {
    margin: 0;
  }

  .footer-copyright span {
    color: #d7ae49;
  }

  .footer-quick-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-right: 0;
  }

  .footer-quick-links a {
    color: #eae4db;
    font-size: 16px;
    text-decoration: none;
    font-family: 'Segoe UI', sans-serif;
  }

  .whatsapp-float {
    position: fixed;
    right: 24px;
    bottom: 28px;
    z-index: 999;
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #25d366;
    color: white;
    box-shadow: 0 16px 32px rgba(37,211,102,0.34);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 980px) {
    .services-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .portfolio-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .film-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .blog-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .about-wrap, .contact-wrap, .video-highlight { grid-template-columns: 1fr; }
    .nav { display: none; }
    .footer-main { grid-template-columns: 1fr; }
    .footer-brand { border: 0; border-top: 1px solid rgba(255,255,255,0.12); border-bottom: 1px solid rgba(255,255,255,0.12); }
  }

  @media (max-width: 640px) {
    .section { padding: 70px 0; }
    .services-grid, .portfolio-grid, .film-grid, .blog-grid, .testimonial-grid, .form-row { grid-template-columns: 1fr; }
    .hero-content { padding-left: 20px; padding-right: 20px; }
    .hero-slider { min-height: 560px; }
    .section-head { display: block; }
    .footer-main { width: calc(100% - 24px); }
    .footer-column { padding: 0; }
    .footer-popular-inner { width: calc(100% - 24px); }
  }
`

export default function HomePage() {
  return (
    <div className="balaji-home">
      <style>{pageStyles}</style>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="logo" aria-label="Balaji Photography">
            <img
              src="https://www.balajiphotography.in/webroot/upload/a79224ab3a3ca80cc20200596f198d95.png"
              alt="Balaji Photography"
            />
          </a>

          <nav className="nav">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="home" className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-box">
                <h2>
                  {slide.title}
                  <span>{slide.subtitle}</span>
                </h2>

                <div className="btn-row">
                  <a href="#portfolio" className="btn primary">
                    View Portfolio
                  </a>
                  <a href="#contact" className="btn secondary">
                    Book Your Session
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="marquee-wrap">
        <div className="container marquee">
          <span>
            Best Wedding Photographer in Uttarakhand • Best Wedding Photography in Dehradun •
            Premium Wedding Films • Candid Stories • Destination Wedding Coverage
          </span>
        </div>
      </div>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Our Services</div>
              <h2>
                Wedding stories <span>crafted with love.</span>
              </h2>
            </div>
          </div>

          <div className="services-grid">
            {serviceCards.map((service) => (
              <article key={service.id} className="service-card">
                <img src={service.image} alt={service.title} />
                <div className="content">
                  <h3>{service.title}</h3>
                  <a href={service.link}>Explore more →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <div className="about-wrap">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                alt="About Balaji Photography"
              />
            </div>

            <div className="about-text">
              <div className="eyebrow">About Us</div>
              <h2 style={{ fontSize: '2.8rem', marginTop: '8px' }}>
                Capturing emotions that <span>last forever.</span>
              </h2>

              <p>
                Welcome to Balaji Photography, where your moments become masterpieces. Nestled in
                the heart of Dehradun, Uttarakhand, we have been capturing the essence of love and
                joy since 2012. With over 200 weddings, 100 pre-wedding shoots, and 150 destination
                weddings captured annually, our lens focuses on creating unforgettable memories that
                stand the test of time.
              </p>

              <p>
                Our passion is storytelling through the art of photography and filmmaking. Every
                frame is designed to retain emotion, light, details, and the energy of the occasion.
              </p>

              <div className="about-more">
                <a href="#contact" className="btn primary">
                  More About Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Wedding Stories</div>
              <h2>
                Handcrafted wedding stories <span>filled with love.</span>
              </h2>
            </div>
          </div>

          <div className="portfolio-grid">
            {portfolioCards.map((item, index) => (
              <a href={item.link} key={index} className="portfolio-card">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-caption">
                  <span>Portfolio</span>
                  <h4>{item.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Wedding Films</div>
              <h2>
                Where every frame tells the <span>story of your love.</span>
              </h2>
            </div>
          </div>

          <div className="video-highlight">
            <div className="feature-video">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                alt="featured wedding film"
              />
            </div>

            <div className="video-metrics">
              <h3>200+ weddings</h3>
              <p>
                Since 2012, we have documented joyous celebrations across Uttarakhand and beyond.
                Our cinematic approach combines real emotion, visual storytelling, and elegant
                composition.
              </p>
            </div>
          </div>

          <div className="film-grid">
            {filmCards.map((film, index) => (
              <div key={index} className="film-card">
                <a href={film.video} target="_blank" rel="noreferrer">
                  <img src={film.image} alt={film.title} />
                </a>
                <div className="content">
                  <h4>{film.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">What Our Customers Are Saying</div>
              <h2>
                Through the lens of our clients <span>and genuine smiles.</span>
              </h2>
            </div>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-tag">{item.tag}</div>
                <p>“{item.text}”</p>

                <div className="person">
                  <img src={item.image} alt={item.name} />
                  <strong>{item.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Recent from my Journal</div>
              <h2>
                Peek into our journal for <span>beautiful stories.</span>
              </h2>
            </div>
          </div>

          <div className="blog-grid">
            {blogCards.map((blog, index) => (
              <article key={index} className="blog-card">
                <a href={blog.link}>
                  <img src={blog.image} alt={blog.title} />
                </a>
                <div className="content">
                  <h4>{blog.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Let’s Talk</div>
              <h2>
                Begin your forever story <span>with us.</span>
              </h2>
            </div>
          </div>

          <div className="contact-wrap">
            <div className="contact-box">
              <h3>Let's talk about your wedding day!</h3>

              <div className="meta">
                <div className="meta-item">
                  <div className="icon">✉</div>
                  <div>
                    <strong>Email</strong>
                    <div>hello@balajiphotography.in</div>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="icon">☎</div>
                  <div>
                    <strong>Phone</strong>
                    <div>+91 89542 53645</div>
                  </div>
                </div>

                <div className="meta-item">
                  <div className="icon">⌖</div>
                  <div>
                    <strong>Location</strong>
                    <div>Dehradun, Uttarakhand, India</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="enquiry-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="input-group">
                  <label>Which describes you?</label>
                  <input type="text" placeholder="Bride, Groom, Planner" />
                </div>

                <div className="input-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Your name" />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="Email address" />
                </div>

                <div className="input-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="Phone number" />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Wedding Date</label>
                  <input type="date" />
                </div>

                <div className="input-group">
                  <label>Venue / Location</label>
                  <input type="text" placeholder="Venue or location" />
                </div>
              </div>

              <div className="input-group">
                <label>Session Type</label>
                <select>
                  <option>Wedding</option>
                  <option>Pre-Wedding</option>
                  <option>Engagement</option>
                  <option>Destination Wedding</option>
                </select>
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea placeholder="Tell us about your story, dates, venue, and your vision..." />
              </div>

              <button type="submit" className="submit-btn">
                Send An Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-column footer-connect">
            <h3>LET’S CONNECT</h3>
            <p>
             Welcome to Vinayank Cinematography, where your moments become our masterpieces. Nestled in the heart of Rampur, we capture memories that last a lifetime.
            </p>

            <div className="footer-socials" aria-label="Social media links">
              <a href="https://www.facebook.com/webalajiphotography/" aria-label="Facebook">f</a>
              <a href="https://www.youtube.com/@webalajiphotography" aria-label="YouTube">▶</a>
              <a href="https://wa.me/918954253645" aria-label="WhatsApp">◉</a>
              <a href="https://www.instagram.com/webalajiphotography/" aria-label="Instagram">◎</a>
              <a href="https://www.pinterest.com/webalajiphotography/" aria-label="Pinterest">p</a>
            </div>
          </div>

          <div className="footer-column footer-brand">
            <a href="#home" className="footer-logo">
              <img
                src="https://www.balajiphotography.in/webroot/upload/a79224ab3a3ca80cc20200596f198d95.png"
                alt="Balaji Photography"
              />
            </a>

            <div className="footer-copyright">
              <p>
                © 2026 <span>Vinayank Cinematography</span> All rights reserved.
              </p>
            </div>
          </div>

          <nav className="footer-column footer-quick-links" aria-label="Quick links">
            <h3>QUICK LINKS</h3>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#stories">Smiles</a>
            <a href="#blogs">Blogs</a>
          </nav>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/918954253645"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </div>
  )
}