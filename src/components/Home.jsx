import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Button from './common/Button';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login');
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');

    authToken ? navigate('/home') : navigate('/login');
  }, [navigate]);
  return (
    <>
      Home Page <Button handleAction={handleLogout} title="Log out" />
    </>
  );
}
