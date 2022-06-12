// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import{
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGFIwkpOh6_ceozZcH4MI4PPzEc4tdy2k",
  authDomain: "crwn-clothing-db-d08fb.firebaseapp.com",
  projectId: "crwn-clothing-db-d08fb",
  storageBucket: "crwn-clothing-db-d08fb.appspot.com",
  messagingSenderId: "286840514329",
  appId: "1:286840514329:web:ba6053216de542b01b0788"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth,provider);
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,provider);

export const db=getFirestore();

export const createUserDocumentFromAuth=async(userAuth)=>{
  const userDocRef=doc(db,'users',userAuth.uid);
  console.log(userDocRef);
  const userSnapshot=await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName,email}=userAuth;
    const createdAt=new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
    } catch(error){
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};