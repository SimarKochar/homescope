// src/pages/AboutPage.js
import React from 'react';
import './AboutPage.css'; // We'll create this CSS file
// Optional: Import an image if you have one
// import aboutImage from '../assets/images/about-us-banner.jpg'; // Example path

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-header">
        <h1>About HomeScope Clone</h1>
        <p className="about-subtitle">Your trusted partner in finding the perfect home.</p>
        {/* Optional Banner Image */}
        {/* <img src={aboutImage} alt="Our team or office" className="about-banner-image" /> */}
      </div>

      <section className="about-section mission-vision">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            To simplify the home searching process by providing an intuitive, comprehensive, and reliable platform connecting buyers, renters, and sellers. We strive to empower our users with the data and tools they need to make informed real estate decisions.
          </p>
        </div>
         {/* Optional: Add a Vision section similarly */}
         {/* <div className="section-content">
            <h2>Our Vision</h2>
            <p>To be the leading online destination for real estate discovery, fostering a community built on trust and transparency.</p>
         </div> */}
      </section>

      <section className="about-section values">
         <h2>Our Values</h2>
         <div className="values-grid">
             <div className="value-item">
                 {/* Add icons later if desired */}
                 <h3>Integrity</h3>
                 <p>We operate with honesty and transparency in all our dealings.</p>
             </div>
             <div className="value-item">
                 <h3>User-Centric</h3>
                 <p>Our users' needs are at the forefront of our design and features.</p>
             </div>
             <div className="value-item">
                 <h3>Innovation</h3>
                 <p>We continuously seek to improve our platform with cutting-edge technology.</p>
             </div>
              <div className="value-item">
                 <h3>Reliability</h3>
                 <p>Providing accurate and up-to-date information is our priority.</p>
             </div>
         </div>
      </section>

      <section className="about-section team">
        <h2>Meet the Team (Placeholder)</h2>
        <p>
          We are a passionate group of developers, designers, and real estate enthusiasts dedicated to building the best property platform. (Replace with actual team info or remove).
        </p>
        {/* Placeholder for team member cards */}
        <div className="team-grid-placeholder">
            <div className="team-member-placeholder">Team Member 1</div>
            <div className="team-member-placeholder">Team Member 2</div>
            <div className="team-member-placeholder">Team Member 3</div>
        </div>
      </section>

       <section className="about-section join-us">
         <h2>Join Us</h2>
         <p>Interested in learning more or partnering with HomeScope Clone? We'd love to hear from you!</p>
         {/* Optionally link to contact page */}
         {/* <Link to="/contact" className="btn btn-primary">Contact Us</Link> */}
      </section>
    </div>
  );
};

export default AboutPage;