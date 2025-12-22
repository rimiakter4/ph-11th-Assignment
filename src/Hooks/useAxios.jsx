// import axios from 'axios';
// import React, { useEffect } from 'react';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//         baseURL:'https://germents-factory-server.vercel.app'
//     })

// const useAxios=()=>{
//     const {user}=useAuth()
//  useEffect(() => {
//         // ১. Request Interceptor: টোকেন পাঠানোর জন্য
//      axiosSecure.interceptors.request.use(
//             (config) => {
//                 // const token = localStorage.getItem('access-token');
               
//                     config.headers.authorization = `Bearer ${user?.token}`
//                      return config;
//                 })
               
//             },[user])
//             // (error) => Promise.reject(error)


//     return axiosSecure
//         }
// export default useAxios

// axios instance তৈরি aita right 
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";


// const axiosSecure = axios.create({
//     baseURL: 'https://germents-factory-server.vercel.app'
// });

// const useAxiosSecure = () => {
//     const { logOut, user } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // ১. Request Interceptor: টোকেন হেডার এ পাঠানোর জন্য
//         const requestInterceptor = axiosSecure.interceptors.request.use(
//             (config) => {
//                 const token = user?.token || localStorage.getItem('access-token');
//                 if (token) {
//                     config.headers.authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             (error) => {
//                 return Promise.reject(error);
//             }
//         );

//         // ২. Response Interceptor: ৪০১ বা ৪০৩ এরর আসলে অটো লগআউট
//         const responseInterceptor = axiosSecure.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//                     await logOut();
//                     navigate('/login');
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         // ৩. Clean up: ইন্টারসেপ্টর রিমুভ করা যাতে ডুপ্লিকেট না হয়
//         return () => {
//             axiosSecure.interceptors.request.eject(requestInterceptor);
//             axiosSecure.interceptors.response.eject(responseInterceptor);
//         };
//     }, [logOut, navigate, user]);

//     return axiosSecure;
// };

// export default useAxiosSecure;



import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

// ১. Axios Instance তৈরি
const axiosSecure = axios.create({
    baseURL: 'https://germents-factory-server.vercel.app'
});

const useAxiosSecure = () => {
    const { logOut, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // ২. Request Interceptor: প্রতিটা রিকোয়েস্টের সাথে টোকেন পাঠানো
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                // টোকেন খোঁজার লজিক
                let token = localStorage.getItem('access-token');
                
                // যদি localStorage এ না থাকে এবং Firebase ইউজার থাকে, তবে টোকেন জেনারেট করা
                if (!token && user?.getIdToken) {
                    token = await user.getIdToken();
                }

                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // ৩. Response Interceptor: ৪Axios Error (401/403) হ্যান্ডেল করা
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                // যদি টোকেন ইনভ্যালিড হয় বা এক্সেস না থাকে তবে লগআউট
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // ৪. ক্লিনআপ (Cleanup): মেমোরি লিক এবং ডুপ্লিকেট ইন্টারসেপ্টর রোধে
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate, user]);

    return axiosSecure;
};

export default useAxiosSecure;







// import axios from "axios";
// import useAuth from "./useAuth";
// import { useEffect } from "react";

// const axiosSecure = axios.create({
//     baseURL: 'https://germents-factory-server.vercel.app' // আপনার ব্যাকএন্ড পোর্ট অনুযায়ী পরিবর্তন করুন
// });

// const useAxiosSecure = () => {
//     const { user } = useAuth();

//     useEffect(() => {
//         // রিকোয়েস্ট পাঠানোর সময় অটোমেটিক হেডার যোগ করবে
//         const requestInterceptor = axiosSecure.interceptors.request.use(
//             (config) => {
//                 const token = localStorage.getItem('access-token');
//                 if (token) {
//                     config.headers.authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             (error) => {
//                 return Promise.reject(error);
//             }
//         );

//         // ক্লিনআপ ফাংশন (যাতে মেমোরি লিক না হয়)
//         return () => {
//             axiosSecure.interceptors.request.eject(requestInterceptor);
//         };
//     }, [user]);

//     return axiosSecure;
// };

// export default useAxiosSecure;
// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: 'https://germents-factory-server.vercel.app' // আপনার ব্যাকএন্ডের ইউআরএল
// });

// const useAxiosSecure = () => {
//     const { logOut } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // ১. Request Interceptor: টোকেন পাঠানোর জন্য
//         const requestInterceptor = axiosSecure.interceptors.request.use(
//             (config) => {
//                 const token = localStorage.getItem('access-token');
//                 if (token) {
//                     config.headers.authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             // (error) => Promise.reject(error)
//         );

//         // ২. Response Interceptor: ৪০১/৪০৩ এরর আসলে লগআউট করার জন্য
//     //     const responseInterceptor = axiosSecure.interceptors.response.use(
//     //         (response) => response,
//     //         async (error) => {
//     //             if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//     //                 await logOut();
//     //                 navigate('/login');
//     //             }
//     //             return Promise.reject(error);
//     //         }
//     //     );

//     //     // ক্লিনআপ: যাতে ডুপ্লিকেট ইন্টারসেপ্টর তৈরি না হয়
//     //     return () => {
//     //         axiosSecure.interceptors.request.eject(requestInterceptor);
//     //         axiosSecure.interceptors.response.eject(responseInterceptor);
//     //     };
//     // }, [logOut, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;