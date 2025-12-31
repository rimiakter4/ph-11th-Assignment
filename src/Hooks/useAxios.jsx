


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





