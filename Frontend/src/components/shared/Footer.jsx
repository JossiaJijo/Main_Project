import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Sponsorship Portal. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px 0', // Increased padding for better spacing
    backgroundColor: '#6c5ce7', // Changed color to blue
    color: 'white',
    width: '100%', // Full width
    fontSize: '14px', // Compact font
    boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for design depth
    marginTop: '20px', // Adds space between content and footer
  },
};

export default Footer;
