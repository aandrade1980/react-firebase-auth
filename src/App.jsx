import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Components
import Form from './components/common/Form';
import Home from './components/Home';

// Firebase
import { app } from './firebase-config';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import './App.css';

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/home');
    }
  }, [navigate]);

  const handleAction = async actionType => {
    const authentication = getAuth();

    try {
      let response = '';

      if (actionType === REGISTER) {
        response = await createUserWithEmailAndPassword(
          authentication,
          email,
          password
        );
      }

      if (actionType === LOGIN) {
        response = await signInWithEmailAndPassword(
          authentication,
          email,
          password
        );
      }

      sessionStorage.setItem(
        'Auth Token',
        response._tokenResponse.refreshToken
      );

      navigate('/home');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/invalid-email') {
        toast.error('Email is invalid');
      }
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found');
      }
      if (error.code === 'auth/wrong-password') {
        toast.error('Wrong password');
      }
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use');
      }
    }
  };

  return (
    <div className="App">
      <>
        <ToastContainer />
        <Routes>
          {['/', '/login'].map((path, index) => (
            <Route
              path={path}
              element={
                <Form
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(LOGIN)}
                />
              }
              key={index}
            />
          ))}
          <Route
            path="/register"
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(REGISTER)}
              />
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
