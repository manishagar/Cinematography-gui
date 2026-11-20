import React from "react";
import { Link } from "react-router-dom";
import ShreeVaniHeader from "./ShreeVaniHeader";
import "../css/ShreeVani.css";

export const services = [
  { title: "Religious", subtitle: "Faith & devotion", image: "/images/religious.jfif", description: "Celebrate spiritual traditions, rituals and meaningful occasions.", path: "/shree-vani/services/religious", icon: "✦" },
  { title: "Familial", subtitle: "Togetherness & joy", image: "/images/family.jfif", description: "Strengthening family relationships through special celebrations.", path: "/shree-vani/services/familial", icon: "♡" },
  { title: "Social", subtitle: "Culture & connection", image: "/images/social.jfif", description: "Connecting communities through cultural and social activities.", path: "/shree-vani/services/social", icon: "❋" },
];
export default function ShreeVani() {
 return <div className="sv-page"><ShreeVaniHeader />
  <main>
   <section className="sv-hero"><div className="sv-hero-pattern"/><div className="sv-hero-inner"><span className="sv-kicker sv-light">✦ TRADITION · FAMILY · COMMUNITY ✦</span><h1>Where Traditions <em>Come Alive</em></h1><p>Welcome to Shree Vani Jagat — a place to celebrate our heritage, cherish meaningful moments and bring hearts together.</p><div className="sv-actions"><Link className="sv-btn sv-btn-gold" to="/shree-vani/services">Explore Our Services <span>↗</span></Link><Link className="sv-btn sv-btn-ghost" to="/shree-vani/contact">Get in Touch <span>→</span></Link></div></div><div className="sv-hero-bottom">ROOTED IN TRADITION <span>✦</span> CONNECTED BY HEART</div></section>
   <section className="sv-section sv-intro"><span className="sv-kicker">WELCOME TO SHREE VANI JAGAT</span><h2>Celebrating the Beauty of <em>Being Together</em></h2><p>From cherished traditions to joyous gatherings, discover a community built on connection, culture and care.</p><div className="sv-ornament">✦</div></section>
   <section className="sv-section sv-services-section"><div className="sv-section-heading"><div><span className="sv-kicker">DISCOVER WHAT WE DO</span><h2>Our <em>Services</em></h2></div><Link to="/shree-vani/services" className="sv-text-link">View all services ↗</Link></div><div className="sv-services-grid">{services.map((s,i)=><Link to={s.path} className="sv-service-card" key={s.title}><div className="sv-service-image"><img src={s.image} alt={s.title} loading="lazy"/><span className="sv-service-number">0{i+1}</span></div><div className="sv-service-body"><span className="sv-card-kicker">{s.subtitle}</span><h3>{s.title}</h3><p>{s.description}</p><span className="sv-service-link">Discover more <span>↗</span></span></div></Link>)}</div></section>
   <section className="sv-about-section"><div className="sv-about-inner"><div className="sv-about-image"><img src="/images/about.jpg" alt="Community celebration" loading="lazy"/><span className="sv-image-stamp">✦ CELEBRATE TOGETHER ✦</span></div><div className="sv-about-content"><span className="sv-kicker">OUR STORY</span><h2>A Place for <em>Every Connection</em></h2><p>Shree Vani Jagat brings religious, familial and social experiences together in one welcoming space.</p><p>We believe every tradition has a story, every gathering creates a memory and every connection makes our community stronger.</p><Link to="/shree-vani/contact" className="sv-btn sv-btn-primary">Connect With Us <span>↗</span></Link></div></div></section>
   <section className="sv-cta-section"><span className="sv-kicker sv-light">WE'D LOVE TO HEAR FROM YOU</span><h2>Let's Create Meaningful <em>Moments</em></h2><p>Have a question or want to know more about our services? We're here to help.</p><Link className="sv-btn sv-btn-gold" to="/shree-vani/contact">Contact Us <span>↗</span></Link></section>
  </main><footer className="sv-footer"><div><strong>Shree Vani Jagat</strong><p>Tradition · Family · Community</p></div><p>© {new Date().getFullYear()} Shree Vani Jagat. All rights reserved.</p></footer>
 </div>;
}
