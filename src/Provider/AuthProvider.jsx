// import { useEffect, useState } from 'react'
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
// //   getAuth,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,

// } from 'firebase/auth'

// import { AuthContext } from './AuthContext'
// import { auth } from '../Firebase/firebase.config'
// // import useAxios from '../Hooks/useAxios'



// const AuthProvider = ({ children }) => {
// // const axiosSecure=useAxios()
//  const [user, setUser] = useState();
// //  const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const creatUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const sininuser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     setLoading(true);
//     return signOut(auth);
//   };
//   // UPDATE PROFILE
// const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     })
//   }
// // download profile 







//   const provider = new GoogleAuthProvider();
//   const googlelogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, provider);
//   };

//   const resetPassword = (email) => {
//     setLoading(true);
//     return sendPasswordResetEmail(auth, email);
//   };


// // const fetchDbUser = async (email) => {
// //   const res = await axiosSecure.get(
// //     `/users/${email}`,
// //     { withCredentials: true }
// //   );
// //   setDbUser(res.data);
// // };




//   useEffect(() => {
//     const unsubcribe = onAuthStateChanged(auth, (currentuser) => {
//       setUser(currentuser);
//       setLoading(false);
//     });
//     return () => {
//       unsubcribe();
//     };
//   }, []);
// // useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// //       setUser(currentUser);
// //       if (currentUser?.email) {
// //         // 🔹 Fetch MongoDB user role/status
// //         const res = await axiosSecure.get(
// //           `/users/${currentUser.email}`
// //         );
// //         setDbUser(res.data);
// //       } else {
// //         setDbUser(null);
// //       }
// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, []);
// // useEffect(() => {
// //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// //     setUser(currentUser);
// //     setLoading(true);

// //     if (currentUser?.email) {
// //       try {
// //         // Fresh user fetch from MongoDB
// //         const res = await axiosSecure.get(
// //           `/users/${currentUser.email}`
// //         );
// //         setDbUser(res.data); // 🔹 Fresh role set
// //       } catch (err) {
// //         console.error("Failed to fetch user from DB", err);
// //       }
// //     } else {
// //       setDbUser(null);
// //     }

// //     setLoading(false);
// //   });

// //   return () => unsubscribe();
// // }, []);

//   const authinfo = {
//     creatUser,
//     user,
//     setUser,       
//     loading,
//     sininuser,
//     logout,
//     googlelogin,
//     resetPassword,
//     setLoading,updateUserProfile, 
//   };

//   return (
//     <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
//   )
// }

// export default AuthProvider
// // import { useEffect, useState } from "react";
// // import {
// //   GoogleAuthProvider,
// //   createUserWithEmailAndPassword,
// //   onAuthStateChanged,
// //   sendPasswordResetEmail,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   signOut,
// //   updateProfile,
// // } from "firebase/auth";
// // import axios from "axios";
// // import { AuthContext } from "./AuthContext";
// // import { auth } from "../Firebase/firebase.config";

// // const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);      // firebase user
// //   const [dbUser, setDbUser] = useState(null);  // mongo user
// //   const [loading, setLoading] = useState(true);

// //   const creatUser = (email, password) => {
// //     setLoading(true);
// //     return createUserWithEmailAndPassword(auth, email, password);
// //   };

// //   const sininuser = (email, password) => {
// //     setLoading(true);
// //     return signInWithEmailAndPassword(auth, email, password);
// //   };

// //   const logout = async () => {
// //     setLoading(true);
// //     await axios.post(
// //       "https://your-server-url/logout",
// //       {},
// //       { withCredentials: true }
// //     );
// //     return signOut(auth);
// //   };

// //   const updateUserProfile = (name, photo) => {
// //     return updateProfile(auth.currentUser, {
// //       displayName: name,
// //       photoURL: photo,
// //     });
// //   };

// //   const provider = new GoogleAuthProvider();
// //   const googlelogin = () => {
// //     setLoading(true);
// //     return signInWithPopup(auth, provider);
// //   };

// //   const resetPassword = (email) => {
// //     setLoading(true);
// //     return sendPasswordResetEmail(auth, email);
// //   };

// //   // 🔥 MAIN FIX HERE
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// //       if (currentUser?.email) {
// //         setUser(currentUser);

// //         // ✅ create jwt cookie
// //         await axios.post(
// //           "https://your-server-url/jwt",
// //           { email: currentUser.email },
// //           { withCredentials: true }
// //         );

// //         // ✅ get user role from DB
// //         const res = await axios.get(
// //           `https://your-server-url/users/${currentUser.email}`,
// //           { withCredentials: true }
// //         );

// //         setDbUser(res.data);
// //         setLoading(false);
// //       } else {
// //         setUser(null);
// //         setDbUser(null);
// //         setLoading(false);
// //       }
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const authinfo = {
// //     user,
// //     dbUser,          // 🔥 VERY IMPORTANT
// //     loading,
// //     creatUser,
// //     sininuser,
// //     logout,
// //     googlelogin,
// //     resetPassword,
// //     updateUserProfile,
// //     setLoading,
// //   };

// //   return (
// //     <AuthContext.Provider value={authinfo}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export default AuthProvider;
import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios'; // axios ব্যবহার করলে সুবিধা বেশি
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.config';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null); // 🔹 এটি ডাটাবেসের লেটেস্ট ডাটা রাখবে
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

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
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

  // 🔥 ডাইনামিক রোল ফেচিং লজিক
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser?.email) {
        try {
          // আপনার ব্যাকএন্ড থেকে ইউজারের ডাটা (রোলসহ) নিয়ে আসা
          const res = await axios.get(`https://germents-factory-server.vercel.app/user/${currentUser.email}/role`);
          setDbUser(res.data); // ডাটাবেসে রোল চেঞ্জ করলে এখানে আপডেট হয়ে যাবে
        } catch (err) {
          console.error("Error fetching db user:", err);
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authinfo = {
    user,
    dbUser, // 🔹 এখন আপনি যেকোনো পেজে dbUser.role ব্যবহার করতে পারবেন
    loading,
    setLoading,
    creatUser,
    sininuser,
    logout,
    googlelogin,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authinfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;