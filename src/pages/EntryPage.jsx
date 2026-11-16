
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EntryPage.css";

const EntryPage = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="entry-page">

      {/* Vinayak Cinematography */}
      <section className="website-section vinayak">
        <div className="website-content">

          <div className="logo-container">
            <img
              src="/images/vinayak logo.png"
              alt="Vinayak Cinematography"
              className="website-logo vinayak-logo"
            />
          </div>

          <h1>Vinayak Cinematography</h1>

          <button
            type="button"
            className="enter-button"
            onClick={() => setShowComingSoon(true)}
          >
            Enter Website
          </button>

          {showComingSoon && (
            <div className="coming-soon-message">
              <h2>Coming Soon!</h2>
              <p>
                Our website is currently under development.
                We are working hard to bring you an amazing
                photography experience.
              </p>
              <p>Stay tuned. We will be launching soon!</p>
            </div>
          )}

        </div>
      </section>

      {/* Shree Vani */}
      <section className="website-section shree-vani">
        <div className="website-content">

          <div className="logo-container">
            <img
              src="/images/Logo.png"
              alt="Shree Vani"
              className="website-logo shree-logo"
            />
          </div>

          <h1>Shree Vani Jagat</h1>

          <button
            type="button"
            className="enter-button"
            onClick={() => navigate("/shree-vani")}
          >
            Enter Website
          </button>

        </div>
      </section>

    </div>
  );
};

export default EntryPage;
