import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ ...styles.container, backgroundImage: `url('/background.jpeg')` }}>
        <div style={styles.content}>
          <h1 style={styles.heading}>Welcome to TrackSponso</h1>
          <p style={styles.description}>
            Our platform offers a comprehensive solution for seamless sponsorship management, empowering sponsors and seekers alike. 
            Discover new opportunities, streamline proposal tracking, and foster growth through innovative solutions.
          </p>

          <section style={styles.section}>
            <h2 style={styles.subHeading}>Why Choose Us?</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>Comprehensive sponsorship tracking and management tools</li>
              <li style={styles.listItem}>Real-time updates on proposals and project statuses</li>
              <li style={styles.listItem}>Enhanced collaboration between sponsors and seekers</li>
              <li style={styles.listItem}>Secure and transparent communication platform</li>
              <li style={styles.listItem}>Detailed analytics and reporting for performance insights</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    backgroundImage: '/background.jpeg', // Dynamically set in the component
    backgroundSize: 'cover', // Cover the full container
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Avoid repeating the image
    color: '#333',
    padding: '60px 20px',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
    color: '#333',
    padding: '40px 60px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#2d3e50',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '30px',
    color: '#555',
  },
  section: {
    marginTop: '40px',
    textAlign: 'left',
  },
  subHeading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2d3e50',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '40px',
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#333',
    maxWidth: '700px',
    margin: '0 auto',
  },
  listItem: {
    marginBottom: '10px',
  },
};

export default Home;
