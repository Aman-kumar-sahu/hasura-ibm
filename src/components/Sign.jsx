import React, { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'
import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils'

const Sign = () => {
// useEffect(async()=>{
//   const response=await getRedirectResult(auth);
//   console.log(response);
// },[]);

    const logGoogleUser=async()=>{
        const {user}=await signInWithGooglePopup();
        const userDocRef=await createUserDocumentFromAuth(user);
    };

  return (
    <div>
        <h1>Sign in</h1>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
    </div>
  )
}

export default Sign