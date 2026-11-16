
import React from "react";
import { Link } from "react-router-dom";
import ShreeVaniHeader from "./ShreeVaniHeader";
import "../css/ShreeVani.css";

const services = [
  {
    title: "Religious",
    image: "/images/religious.jfif",
    description:
      "Celebrate spiritual traditions, rituals and meaningful occasions.",
    path: "/shree-vani/services/religious",
  },
  {
    title: "Familial",
    image: "/images/family.jfif",
    description:
      "Strengthening family relationships through special celebrations.",
    path: "/shree-vani/services/familial",
  },
  {
    title: "Social",
    image: "/images/social.jfif",
    description:
      "Connecting communities through cultural and social activities.",
    path: "/shree-vani/services/social",
  },
];

const ShreeVani = () => {
  return (
    <div className="sv-page">
      <ShreeVaniHeader />

      {/* Hero Section */}
      <section className="sv-hero">
        <div className="sv-hero-overlay" />

        <div className="sv-hero-content">
          <span className="sv-eyebrow">
            TRADITION • FAMILY • COMMUNITY
          </span>

          <h1>Welcome to Shree Vani Jagat</h1>

          <p>
            Celebrating our traditions, strengthening
            family bonds and bringing communities together.
          </p>

          <div className="sv-hero-actions">
            <Link
              to="/shree-vani/services"
              className="sv-primary-btn"
            >
              Explore Our Services
            </Link>

            <Link
              to="/shree-vani/contact"
              className="sv-outline-btn"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="sv-services-section">
        <div className="sv-section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Our Services</h2>
          <p>
            Discover the different ways we celebrate
            traditions and bring people together.
          </p>
        </div>

        <div className="sv-services-grid">
          {services.map((service) => (
            <article
              className="sv-service-card"
              key={service.title}
            >
              <div className="sv-service-image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
              </div>

              <div className="sv-service-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <Link
                  to={service.path}
                  className="sv-service-link"
                >
                  Explore Service →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="sv-about-section">
        <div className="sv-about-inner">
          <div className="sv-about-content">
            <span className="sv-section-kicker">
              ABOUT US
            </span>

            <h2>Welcome to Our Community</h2>

            <p>
              Shree Vani Jagat brings together religious,
              familial and social experiences in one
              welcoming place.
            </p>

            <p>
              Explore our services and stay connected
              with our community.
            </p>

            <Link
              to="/shree-vani/contact"
              className="sv-primary-btn"
            >
              Get in Touch
            </Link>
          </div>

          <div className="sv-about-image">
            <img
              src="/images/about.jpg"
              alt="Community celebration"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="sv-cta-section">
        <h2>Let's Stay Connected</h2>
        <p>
          Have a question or want to know more
          about our services?
        </p>

        <Link
          to="/shree-vani/contact"
          className="sv-cta-btn"
        >
          Contact Us
        </Link>
      </section>

      {/* Footer */}
      <footer className="sv-footer">
        <div>
          <h3>Shree Vani Jagat</h3>
          <p>Tradition • Family • Community</p>
        </div>



        <p>
          © {new Date().getFullYear()} Shree Vani Jagat.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ShreeVani;
