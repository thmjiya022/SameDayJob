import { useEffect, useState } from 'react';
import api from '../lib/api';

function Home() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    api.get('/home')
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Could not load welcome message.'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{message || 'Loading...'}</h1>
    </div>
  );
}

export default Home;
