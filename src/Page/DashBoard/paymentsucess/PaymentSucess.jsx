// // src/Pages/PaymentSuccess.jsx
// import React, { useEffect } from "react";
// // import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";

// export default function PaymentSucess() {
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   // SweetAlert success
//   //   Swal.fire({
//   //     title: "Payment Successful!",
//   //     text: "Your order has been placed successfully.",
//   //     icon: "success",
//   //     timer: 2000,
//   //     showConfirmButton: false,
//   //   });})

//   //   // Auto redirect after 2 seconds
//   //   const timer = setTimeout(() => {
//   //     navigate("/my-orders");
//   //   }, 2000);

//   //   return () => clearTimeout(timer);
//   // }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 text-center"
//       >
//         <h1 className="text-3xl font-extrabold text-green-700 mb-4">
//           🎉 Payment Successful!
//         </h1>
//         <p className="text-gray-700 mb-2">
//           Thank you for your purchase. Your order has been placed successfully.
//         </p>
//         <p className="text-gray-500">You will be redirected to your orders shortly...</p>
//       </motion.div>
//     </div>
//   );
// }
// src/Pages/PaymentSuccess.jsx
// import React, { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// // import useAxios from "../../Hooks/useAxios";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const [searchParams] = useSearchParams();

//   // Stripe session id
//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     if (!sessionId) return;

//     // 🔵 backend-এ payment confirm + DB save
//     axiosSecure.post("/orders/confirm-payment", { sessionId })
//     // console.log("sessionId:", sessionId);

//       .then((res) => {
//         if (res.data.insertedId) {
//           Swal.fire({
//             title: "Payment Successful!",
//             text: "Your order has been placed successfully.",
//             icon: "success",
//             timer: 2000,
//             showConfirmButton: false,
//           });

//           setTimeout(() => {
//             navigate("/dashboard/myOrders");
//           }, 2000);
//         }
//       })
//       .catch(() => {
//         Swal.fire(
//           "Error",
//           "Payment verification failed. Please contact support.",
//           "error"
//         );
//       });
//   }, [sessionId, axiosSecure, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 text-center"
//       >
//         <h1 className="text-3xl font-extrabold text-green-700 mb-4">
//           🎉 Payment Successful!
//         </h1>
//         <p className="text-gray-700 mb-2">
//           Thank you for your purchase. Your order is being processed.
//         </p>
//         <p className="text-gray-500">
//           Please wait, redirecting to your orders...
//         </p>
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    axios.post("https://germents-factory-server.vercel.app/orders/confirm-payment", {
      sessionId,
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/dashboard/myOrders");
      }, 2000);
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Payment verification failed",
      });
    });
  }, [sessionId, navigate]);

  return null;
}
