import React, { useEffect } from 'react';
import { fetchTest } from '@/services/testRequest';

const Welcome = () => {
  useEffect(() => {
    fetchTest().then(
      response => {
        console.log('response', response);
      },
      error => {
        console.log('error', error);
      },
    );
  }, []);
  return (
    <div className="welcome" style={{ height: '1000px', backgroundColor: 'pink' }}>
      欢迎页
    </div>
  );
};

export default Welcome;
