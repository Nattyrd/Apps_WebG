import React from 'react';
import Navbar from './Navbar/Navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
    <div style={styles.container}>
      
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default Home;