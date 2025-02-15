import React, { useState } from 'react';
import Navbar from './Navbar'; // Ensure correct path
import HomePage from './HomePage'; // Import HomePage component


const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      <div>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'sponsor-details' && <p>Sponsor Details Section</p>}
        {currentPage === 'seeker-details' && <p>Seeker Details Section</p>}
      </div>
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Admin Dashboard. All Rights Reserved.</p>
      </footer>
    </>
  );
};
const styles = {
  footer: {
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    textAlign: 'center',
  },
};

export default AdminDashboard;
