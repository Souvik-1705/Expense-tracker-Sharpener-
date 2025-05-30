import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase';
import "../styles/VerifyEmail.css";

function VerifyEmail() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const checkVerification = () => {
      const user = auth.currentUser;
      if (user) {
        user.reload().then(() => {
          setEmailVerified(user.emailVerified);
        });
      }
    };

    checkVerification();
  }, []);

  const sendVerificationEmail = async () => {
    setMessage('');
    setError('');

    try {
      const idToken = await auth.currentUser.getIdToken();

      const res = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCDmXL7rGHKZqsGV4syUI5r8qYfEkpoSZg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: idToken,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setError(`Error: ${data.error.message}`);
      } else {
        setMessage('Check your email. A verification link has been sent.');
      }
    } catch (err) {
      setError('Failed to send verification email.');
    }
  };

  return (
    <div className="verify-email-box">
      {emailVerified ? (
        <p className="verified-msg">✅ Your email is verified.</p>
      ) : (
        <>
          <button onClick={sendVerificationEmail}>Verify Email</button>
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
