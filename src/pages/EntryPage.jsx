import React from "react";
import { Link } from "react-router-dom";
import "../css/EntryPage.css";

const sites = [
  {
    key: "cinema",
    name: "Vinayak Cinematography",
    kicker: "THE ART OF STORYTELLING",
    tagline: "Every frame tells a story.",
    description: "Capturing moments. Creating memories that last forever.",
    logo: "/images/vinayak logo.png",
    path: "/vinayak-cinematography",
    button: "Explore Cinematography",
  },
  {
    key: "vani",
    name: "Shree Vani Jagat",
    kicker: "TRADITION · FAMILY · COMMUNITY",
    tagline: "Rooted in tradition. United by heart.",
    description: "Celebrating culture, connections and meaningful moments.",
    logo: "/images/Logo.png",
    path: "/shree-vani",
    button: "Explore Shree Vani",
  },
];

export default function EntryPage() {
  return (
    <main className="entry-page">
      <div className="entry-topline"><span className="entry-topline-dot" /> TWO WORLDS · ONE BEAUTIFUL JOURNEY</div>
      <div className="entry-grid">
        {sites.map((site) => (
          <section className={`entry-panel entry-panel--${site.key}`} key={site.key}>
            <div className="entry-orbit entry-orbit--one" aria-hidden="true" />
            <div className="entry-orbit entry-orbit--two" aria-hidden="true" />
            <div className="entry-panel-content">
              <span className="entry-kicker">{site.kicker}</span>
              <div className="entry-logo-wrap">
                <img src={site.logo} alt={`${site.name} logo`} className="entry-logo" />
              </div>
              <div className="entry-copy">
                <h1>{site.name}</h1>
                <p className="entry-tagline">{site.tagline}</p>
                <p className="entry-description">{site.description}</p>
              </div>
              <Link className="entry-button" to={site.path}>
                <span>{site.button}</span><span aria-hidden="true">↗</span>
              </Link>
            </div>
            <span className="entry-bottom-label">DISCOVER YOUR EXPERIENCE <span aria-hidden="true">✦</span></span>
          </section>
        ))}
      </div>
    </main>
  );
}
