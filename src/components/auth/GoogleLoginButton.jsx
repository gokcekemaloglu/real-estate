import React from 'react'
import useAuthCall from '../../hooks/useAuthCall';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
   const { googleAuth } = useAuthCall();
 
  const handleSuccess = (credentialResponse) => {
    if (credentialResponse?.credential) {
      googleAuth(credentialResponse.credential);
    }
  };
 
  const handleError = () => {
    // Google's own popup already communicates failure to the user; this is just for our own debugging visibility.
    console.error("Google sign-in was unsuccessful.");
  };
  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="pill"
        width="320"
      />
    </div>
  )
}

export default GoogleLoginButton