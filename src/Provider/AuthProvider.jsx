import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
//   getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
//   updateProfile,
} from 'firebase/auth'
// import { app } from '../firebase/firebase.config'
import { AuthContext } from './AuthContext'
import { auth } from '../Firebase/firebase.config'

// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const createUser = (email, password) => {
//     setLoading(true)
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   const signIn = (email, password) => {
//     setLoading(true)
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const signInWithGoogle = () => {
//     setLoading(true)
//     return signInWithPopup(auth, googleProvider)
//   }

//   const logOut = async () => {
//     setLoading(true)
//     return signOut(auth)
//   }

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     })
//   }

//   // onAuthStateChange
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async currentUser => {
//       console.log('CurrentUser-->', currentUser?.email)
//       setUser(currentUser)
//       setLoading(false)
//     })
//     return () => {
//       return unsubscribe()
//     }
//   }, [])

//   const authInfo = {
//     user,
//     setUser,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     logOut,
//     updateUserProfile,
//   }
 const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const sininuser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const provider = new GoogleAuthProvider();
  const googlelogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);


  const authinfo = {
    creatUser,
    user,
    setUser,       
    loading,
    sininuser,
    logout,
    googlelogin,
    resetPassword,
    setLoading
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
