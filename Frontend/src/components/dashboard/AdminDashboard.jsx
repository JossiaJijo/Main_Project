import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, toggleUserBan, getAdminStats, getAllSponsorships, deleteSponsorship } from '../../services/adminService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sponsorships, setSponsorships] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllUsers();
        const sponsorshipData = await getAllSponsorships();
        const statistics = await getAdminStats();

        setUsers(userData);
        setSponsorships(sponsorshipData);
        setStats(statistics);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load admin data.');
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleToggleBan = async (userId, isBanned) => {
    try {
      await toggleUserBan(userId);
      setUsers(users.map(user => (user._id === userId ? { ...user, isBanned: !isBanned } : user)));
    } catch (err) {
      console.error('Error toggling ban:', err);
    }
  };

  const handleDeleteSponsorship = async (sponsorshipId) => {
    if (window.confirm('Are you sure you want to delete this sponsorship?')) {
      try {
        await deleteSponsorship(sponsorshipId);
        setSponsorships(sponsorships.filter(sponsorship => sponsorship._id !== sponsorshipId));
      } catch (err) {
        console.error('Error deleting sponsorship:', err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.stats}>
        <p><strong>Total Users:</strong> {stats.totalUsers}</p>
        <p><strong>Total Sponsorships:</strong> {stats.totalSponsorships}</p>
        <p><strong>Total Proposals:</strong> {stats.totalProposals}</p>
      </div>

      <h3>Manage Users</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role === 1 ? 'Seeker' : 'Sponsor'}</td>
              <td style={user.isBanned ? styles.banned : styles.active}>
                {user.isBanned ? 'Banned' : 'Active'}
              </td>
              <td>
                <button onClick={() => handleToggleBan(user._id, user.isBanned)} style={styles.banButton}>
                  {user.isBanned ? 'Unban' : 'Ban'}
                </button>
                <button onClick={() => handleDeleteUser(user._id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Manage Sponsorships</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sponsorships.map(sponsorship => (
            <tr key={sponsorship._id}>
              <td>{sponsorship.title}</td>
              <td>{sponsorship.description}</td>
              <td>{sponsorship.status}</td>
              <td>
                <button onClick={() => handleDeleteSponsorship(sponsorship._id)} style={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1000px', margin: '0 auto' },
  stats: { marginBottom: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
  banned: { color: 'red', fontWeight: 'bold' },
  active: { color: 'green', fontWeight: 'bold' },
  banButton: { backgroundColor: '#ff9800', padding: '5px 10px', marginRight: '5px', borderRadius: '5px' },
  deleteButton: { backgroundColor: '#d9534f', padding: '5px 10px', borderRadius: '5px' },
  error: { color: 'red' },
};

export default AdminDashboard;
