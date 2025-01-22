import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <div style={{ ...styles.container, backgroundImage: `url('/background.jpeg')` }}>
          <div style={styles.content}>
            <h1 style={styles.heading}>About Us</h1>
            <p style={styles.description}>
              We are passionate about connecting sponsors and seekers, fostering a platform that nurtures collaboration, innovation, and growth.
              Our mission is to simplify sponsorship management, enabling seamless partnerships that drive progress and success.
            </p>

            <section style={styles.section}>
              <h2 style={styles.subHeading}>Our Vision</h2>
              <p style={styles.paragraph}>
                To be the world’s leading platform for fostering innovative sponsorships, empowering individuals and organizations to achieve their goals.
              </p>

              <h2 style={styles.subHeading}>Our Values</h2>
              <ul style={styles.list}>
                <li>Innovation: Embracing creativity to deliver cutting-edge solutions</li>
                <li>Integrity: Building trust through transparency and accountability</li>
                <li>Collaboration: Fostering partnerships for mutual success</li>
                <li>Excellence: Striving for continuous improvement and high standards</li>
              </ul>

              <h2 style={styles.subHeading}>Why Choose Us?</h2>
              <p style={styles.paragraph}>
                Our platform is designed to help you manage sponsorships effortlessly, offering comprehensive tools, real-time updates, secure communication, and detailed reporting.
                We are your trusted partner for sponsorship success.
              </p>
            </section>
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
  section: {
    textAlign: 'left',
    marginTop: '30px',
  },
  subHeading: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#2d3e50',
  },
  paragraph: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '40px',
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '30px',
  },
};

export default AboutUs;
