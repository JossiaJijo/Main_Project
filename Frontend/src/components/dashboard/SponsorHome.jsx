import React from 'react';

const SponsorHome = () => {
  return (
    <div style={{
      padding: '40px 20px', backgroundColor: '#f0f4f8', minHeight: '100vh', textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '36px', color: '#2d3e50', marginBottom: '20px', fontWeight: 'bold' }}>
          Welcome to the Sponsor Dashboard
        </h1>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
          Manage your sponsorships seamlessly and efficiently. Our platform empowers you to connect with seekers, track proposals, and create new sponsorship opportunities.
        </p>

        <h2 style={{ fontSize: '24px', color: '#2d3e50', marginBottom: '15px' }}>
          What You Can Do Here:
        </h2>
        <ul style={{
          listStyleType: 'disc', textAlign: 'left', paddingLeft: '40px',
          fontSize: '18px', color: '#333', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto'
        }}>
          <li>View and manage your active sponsorships.</li>
          <li>Track proposal statuses and review updates in real-time.</li>
          <li>Post new sponsorship opportunities to connect with seekers.</li>
          <li>Monitor the performance and impact of your sponsorships through detailed reports.</li>
          <li>Communicate directly with seekers via our secure messaging platform.</li>
        </ul>

        <h2 style={{ fontSize: '24px', color: '#2d3e50', marginTop: '30px' }}>
          Stay Informed
        </h2>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
          Receive notifications on proposal updates, project milestones, and key sponsorship activities, ensuring you're always up to date.
        </p>

        <h2 style={{ fontSize: '24px', color: '#2d3e50', marginTop: '30px' }}>
          Support and Assistance
        </h2>
        <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
          Our dedicated support team is always here to help you. For any inquiries, reach out to us at support@sponsorship.com.
        </p>
      </div>
    </div>
  );
};

export default SponsorHome;
