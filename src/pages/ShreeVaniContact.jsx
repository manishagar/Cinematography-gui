import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import ShreeVaniHeader from "./ShreeVaniHeader";
import "../css/ShreeVani.css";

// Add the real links when available. WhatsApp format: https://wa.me/91XXXXXXXXXX
const socialLinks = {
  whatsapp: "",
  instagram: "",
  facebook: "",
};

const socialPlatforms = [
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
];

const ShreeVaniContact = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/Zr5JXa3KSUj9ZvZU7";
  const mapQuery = encodeURIComponent(
    "Indrawati Market, Sarafa Bazar, Meston Gunj, Rampur, Uttar Pradesh 244901"
  );
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&z=17&output=embed`;

  return (
    <div className="sv-page">
      <ShreeVaniHeader />

      <section className="sv-contact-section">
        <div className="sv-contact-heading">
          <span>GET IN TOUCH</span>
          <h1>Contact Us</h1>
          <p>Visit us at Indrawati Market, Rampur, Uttar Pradesh.</p>
        </div>

        <div className="sv-contact-layout">
          <div className="sv-contact-card">
            <div className="sv-contact-icon" aria-hidden="true">📍</div>
            <h2>Our Address</h2>
            <h3>Anant Agarwal</h3>
            <address>
              Indrawati Market<br />
              Sarafa Bazar, Meston Gunj<br />
              Rampur, Uttar Pradesh<br />
              PIN - 244901
            </address>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sv-map-btn"
            >
              Get Directions ↗
            </a>

            <div className="sv-social-section">
              <h3>Connect With Us</h3>
              <p>Find us on social media</p>
              <div className="sv-social-icons">
                {socialPlatforms.map(({ key, label, Icon }) => {
                  const url = socialLinks[key]?.trim();
                  return (
                    <div className="sv-social-platform" key={key}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`sv-social-icon sv-${key}`}
                          aria-label={`Open ${label}`}
                          title={label}
                        >
                          <Icon aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          className={`sv-social-icon sv-${key} sv-social-unconfigured`}
                          aria-label={`${label} link not configured`}
                          title={`${label} link coming soon`}
                        >
                          <Icon aria-hidden="true" />
                        </span>
                      )}
                      <span className="sv-social-name">{label}</span>
                    </div>
                  );
                })}
              </div>
              <p className="sv-social-note">
                Social profile links will be enabled once configured.
              </p>
            </div>
          </div>

          <div className="sv-map-card">
            <h2>Find Us on Google Maps</h2>
            <iframe
              title="Map of Indrawati Market, Rampur"
              src={mapEmbedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sv-map-link"
            >
              View Larger Map ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShreeVaniContact;
