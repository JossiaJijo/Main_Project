import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <div style={{ ...styles.container, backgroundImage: `url('/background.jpeg')` }}>
          <div style={styles.content}>
            <h1 style={styles.heading}>Contact Us</h1>
            <p style={styles.description}>
              We are here to help you. Feel free to reach out to us for any queries or support needs.
            </p>
            
            <h2 style={styles.subHeading}>Get in Touch</h2>
            <ul style={styles.list}>
              <li><strong>Email:</strong> support@sponsorship.com</li>
              <li><strong>Phone:</strong> +1-800-555-1234</li>
              <li><strong>Address:</strong> 123 Sponsorship Lane, City, Country</li>
              <li><strong>Business Hours:</strong> Monday to Friday, 9 AM to 5 PM</li>
            </ul>

            <h2 style={styles.subHeading}>Follow Us</h2>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>LinkedIn</a>
              <a href="#" style={styles.socialLink}>Twitter</a>
              <a href="#" style={styles.socialLink}>Facebook</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensures the footer is at the bottom
  },
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#333',
    padding: '60px 20px',
    flex: 1, // Ensures the container fills the remaining space
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
    color: '#333',
    padding: '40px 60px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '36px',
    color: '#2d3e50',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '30px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  subHeading: {
    fontSize: '24px',
    color: '#2d3e50',
    marginTop: '30px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '18px',
    color: '#333',
    textAlign: 'left',
    lineHeight: '1.8',
    maxWidth: '600px',
    margin: '0 auto',
  },
  socialLinks: {
    marginTop: '10px',
    fontSize: '18px',
  },
  socialLink: {
    marginRight: '15px',
    textDecoration: 'none',
    color: '#0073e6',
  },
};

export default ContactUs;
