import React from 'react';

const HomePage = () => (
  <div style={styles.pageContainer}>
    <div style={styles.overlay}>
      <h1 style={{ ...styles.heading, color: 'white' }}>Welcome to the Sponsorship Platform</h1>
      <p style={styles.subtext}>Connecting sponsors with seekers for a brighter future.</p>
      <div style={styles.featuresContainer}>
        <div style={styles.featureBox}>
          <h3>Find Sponsors</h3>
          <p>Explore a variety of sponsorship opportunities to support your goals.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>Connect with Seekers</h3>
          <p>Help individuals and organizations grow with financial and resourceful support.</p>
        </div>
        <div style={styles.featureBox}>
          <h3>Easy Management</h3>
          <p>Manage proposals, track sponsorships, and collaborate seamlessly.</p>
        </div>
      </div>
    </div>
  </div>
);

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: "url('https://source.unsplash.com/1600x900/?business,teamwork')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    color: 'white',
    width: '80%',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  subtext: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  featuresContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  featureBox: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    margin: '10px',
    width: '250px',
    textAlign: 'center',
  }
};

export default HomePage;
