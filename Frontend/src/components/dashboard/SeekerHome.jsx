import React from "react";

const SeekerHome = () => {
  return (
    <div style={{
      padding: '40px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '36px', color: '#2d3e50', marginBottom: '20px', fontWeight: 'bold' }}>
          Welcome to the Seeker Dashboard
        </h1>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
          Discover sponsorship opportunities and connect with sponsors to bring your projects to life.  
          Track submissions, manage communications, and grow your network seamlessly.
        </p>

        <h2 style={{ fontSize: '24px', color: '#2d3e50', marginBottom: '15px' }}>
          What You Can Do Here:
        </h2>
        <ul style={{
          listStyleType: 'disc', textAlign: 'left', paddingLeft: '40px',
          fontSize: '18px', color: '#333', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto'
        }}>
          <li>Browse available sponsorship opportunities tailored to your needs.</li>
          <li>Submit detailed proposals for consideration by sponsors.</li>
          <li>Track the status of your proposals and receive real-time updates.</li>
          <li>Manage communication directly with sponsors via our platform.</li>
          <li>Access tools for proposal optimization and submission insights.</li>
        </ul>

        <h2 style={{ fontSize: '24px', color: '#2d3e50', marginTop: '30px' }}>
          Tips for Success:
        </h2>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
          Make your proposals stand out by clearly articulating your goals, outlining your value, and demonstrating your project's potential impact.
        </p>

        <h2 style={{ fontSize: '24px', color: '#2d3e50', marginTop: '30px' }}>
          Need Help?
        </h2>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
          If you need assistance, reach out to our support team at support@sponsorship.com. We're here to help you succeed!
        </p>
      </div>
    </div>
  );
};

export default SeekerHome;
