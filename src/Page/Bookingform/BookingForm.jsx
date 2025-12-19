// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";

// export default function BookingForm() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();
//   const { user } = useAuth();
//   // const navigate = useNavigate();
//   // if (!user) navigate("/login");

//   const userId = user?.uid;
//   const [quantity, setQuantity] = useState(1);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [notes, setNotes] = useState("");

//   const { data: product, isLoading } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (product) {
//       setQuantity(product.minOrder || 1);
//     }
//   }, [product]);

//   if (isLoading || !product) return <p>Loading product...</p>;

//   const totalPrice = quantity * product.price;

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   let safeQuantity = parseInt(quantity, 10);
// //   if (isNaN(safeQuantity)) safeQuantity = product.minOrder;
// //   safeQuantity = Math.min(Math.max(safeQuantity, product.minOrder), product.availableQuantity);

// //   // Stripe expects unit_amount in cents
// //   const stripeAmount = Math.round(product.price * 100);

// //   const orderData = {
// //     userid: userId,
// //     email: user.email,
// //     productId: product._id,
// //     productTitle: product.name,
// //     quantity: safeQuantity,
// //     unit_amount: stripeAmount, // ✅ cents
// //     firstName,
// //     lastName,
// //     contactNumber,
// //     deliveryAddress,
// //     notes,
// //     paymentType: product.payment.type,
// //     paymentMethods: product.payment.methods,
// //   };

// //   try {
// //     if (product.payment.type === "online") {
// //       const res = await axiosSecure.post("/create-checkout-session", orderData);
// //       window.location.href = res.data.url;
// //     } else {
// //       const res = await axiosSecure.post("/orders", orderData);
// //       if (res.data.insertedId) {
// //         alert("Order placed successfully 🎉");
// //         navigate("/my-orders");
// //       }
// //     }
// //   } catch (err) {
// //     console.error("Stripe checkout error:", err);
// //     alert("Payment initiation failed. Check console.");
// //   }
// // };


// // const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     let safeQuantity = parseInt(quantity, 10);
// //     if (isNaN(safeQuantity)) safeQuantity = product.minOrder;
// //     safeQuantity = Math.min(
// //       Math.max(safeQuantity, product.minOrder),
// //       product.availableQuantity
// //     );

// //     const orderData = {
// //       userid: userId,
// //       email: user.email,
// //       productId: product._id,
// //       productTitle: product.name,
// //       price: Number(product.price),
// //       quantity: safeQuantity,
// //       orderPrice: Number(product.price) * safeQuantity,
// //       firstName,
// //       lastName,
// //       contactNumber,
// //       deliveryAddress,
// //       notes,
// //       paymentType: product.payment.type,
// //       paymentMethods: product.payment.methods,
// //       paymentStatus:
// //         product.payment.type === "online" ? "Pending" : "Unpaid",
// //       orderStatus: "Placed",
// //     };

// //     console.log("Sending orderData:", orderData);

// //     try {
// //       if (product.payment.type === "online") {
// //         const res = await axiosSecure.post(
// //           "/create-checkout-session",
// //           orderData
// //         );
// //         window.location.href = res.data.url;
// //       } else {
// //         const res = await axiosSecure.post("/orders", orderData);
// //         if (res.data.insertedId) {
// //           alert("Order placed successfully 🎉");
// //           navigate("/my-orders");
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Checkout error:", err);
// //       alert("Payment initiation failed. Check console.");
// //     }
// //   };




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Safe quantity
//     let safeQuantity = parseInt(quantity, 10);
//     if (isNaN(safeQuantity)) safeQuantity = product.minOrder;
//     safeQuantity = Math.min(Math.max(safeQuantity, product.minOrder), product.availableQuantity);

//     const orderData = {
//       userid: userId,
//       email: user.email,
//       productId: product._id,
//       productTitle: product.name,
//       price: Number(product.price),
//       quantity: quantity, // guaranteed number
//       orderPrice: Number(product.price) * quantity, // safe calculation
//       firstName,
//       lastName,
//       contactNumber,
//       deliveryAddress,
//       notes,
//       paymentStatus: "Pending",
//     };

//     console.log("Sending orderData:", orderData);

//     try {
//       const res = await axiosSecure.post("/create-checkout-session", orderData);
//       window.location.href = res.data.url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       alert("Payment initiation failed. Check console.");
//     }
//   };

// //   return (
// //     <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow">
// //       <h1 className="text-2xl font-bold mb-4">Booking: {product.name}</h1>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           placeholder="First Name"
// //           value={firstName}
// //           onChange={(e) => setFirstName(e.target.value)}
// //           className="w-full border rounded p-2"
// //           required
// //         />
// //         <input
// //           type="text"
// //           placeholder="Last Name"
// //           value={lastName}
// //           onChange={(e) => setLastName(e.target.value)}
// //           className="w-full border rounded p-2"
// //           required
// //         />
// //         <input
// //           type="text"
// //           placeholder="Contact Number"
// //           value={contactNumber}
// //           onChange={(e) => setContactNumber(e.target.value)}
// //           className="w-full border rounded p-2"
// //           required
// //         />
// //         <input
// //           type="text"
// //           placeholder="Delivery Address"
// //           value={deliveryAddress}
// //           onChange={(e) => setDeliveryAddress(e.target.value)}
// //           className="w-full border rounded p-2"
// //           required
// //         />
// //         <textarea
// //           placeholder="Additional Notes"
// //           value={notes}
// //           onChange={(e) => setNotes(e.target.value)}
// //           className="w-full border rounded p-2"
// //         />
// //         <input
// //           type="number"
// //           value={quantity}
// //           onChange={(e) => {
// //             const val = parseInt(e.target.value, 10);
// //             setQuantity(isNaN(val) ? product.minOrder : val);
// //           }}
// //           min={product.minOrder}
// //           max={product.availableQuantity}
// //           required
// //         />
// //         <p>Total Price: ${totalPrice}</p>
// //         <button type="submit" className="btn btn-green w-full">
// //           Proceed to Payment
// //         </button>
// //       </form>
// //     </div>
// //   );

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   const orderData = {
// //     userId: user?.uid,
// //     email: user?.email,
// //     productId: product._id,
// //     productTitle: product.name,
// //     quantity,
// //     orderPrice: quantity * product.price,

// //     paymentType: product.payment.type,
// //     paymentMethods: product.payment.methods,
// //     paymentStatus:
// //       product.payment.type === "online" ? "Pending" : "Unpaid",

// //     orderStatus: "Placed"
// //   };

// //   try {
// //     // 🔴 CONDITION STARTS HERE
// //     if (product.payment.type === "online") {
// //       // 👉 ONLINE → Stripe
// //       const res = await axiosSecure.post(
// //         "/create-checkout-session",
// //         orderData
// //       );
// //       window.location.href = res.data.url;

// //     } else {
// //       // 👉 OFFLINE → Direct order
// //       const res = await axiosSecure.post("/orders", orderData);

// //       if (res.data.insertedId) {
// //         alert("Order placed successfully 🎉");
// //         navigate("/my-orders");
// //       }
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     alert("Order failed");
// //   }
// // };

// return (
//   <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow">
//     <h1 className="text-2xl font-bold mb-4">Booking: {product.name}</h1>

//     <form onSubmit={handleSubmit} className="space-y-4">

//       {/* Email (auto, read-only) */}
//       <input
//         type="email"
//         value={user?.email || ""}
//         readOnly
//         className="w-full border rounded p-2 bg-gray-100"
//       />

//       {/* Product Title (read-only) */}
//       <input
//         type="text"
//         value={product.name}
//         readOnly
//         className="w-full border rounded p-2 bg-gray-100"
//       />

//       {/* Price per unit (read-only) */}
//       <input
//         type="text"
//         value={`$${product.price} per unit`}
//         readOnly
//         className="w-full border rounded p-2 bg-gray-100"
//       />

//       {/* First Name */}
//       <input
//         type="text"
//         placeholder="First Name"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//         className="w-full border rounded p-2"
//         required
//       />

//       {/* Last Name */}
//       <input
//         type="text"
//         placeholder="Last Name"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//         className="w-full border rounded p-2"
//         required
//       />

//       {/* Order Quantity */}
//       <input
//         type="number"
//         value={quantity}
//         min={product.minOrder}
//         max={product.availableQuantity}
//         onChange={(e) => {
//           const val = parseInt(e.target.value, 10);
//           if (!isNaN(val)) setQuantity(val);
//         }}
//         className="w-full border rounded p-2"
//         required
//       />

//       {/* Order Price (auto calculated, read-only) */}
//       <input
//         type="text"
//         value={`Total Price: $${totalPrice}`}
//         readOnly
//         className="w-full border rounded p-2 bg-gray-100"
//       />

//       {/* Contact Number */}
//       <input
//         type="text"
//         placeholder="Contact Number"
//         value={contactNumber}
//         onChange={(e) => setContactNumber(e.target.value)}
//         className="w-full border rounded p-2"
//         required
//       />

//       {/* Delivery Address */}
//       <input
//         type="text"
//         placeholder="Delivery Address"
//         value={deliveryAddress}
//         onChange={(e) => setDeliveryAddress(e.target.value)}
//         className="w-full border rounded p-2"
//         required
//       />

// {/* payment methoids */}

// <div className="p-3 bg-gray-50 rounded">
//   <p className="font-medium">
//     Payment Type:
//     <span className="ml-2">
//       {product.payment.type === "online"
//         ? "Online Payment"
//         : "Cash on Delivery"}
//     </span>
//   </p>

//   <ul className="list-disc ml-6 text-sm text-gray-600">
//     {product.payment.methods.map((m, i) => (
//       <li key={i}>{m}</li>
//     ))}
//   </ul>
// </div>








//       {/* Notes */}
//       <textarea
//         placeholder="Additional Notes / Instructions"
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         className="w-full border rounded p-2"
//       />

//       <button type="submit" className="btn btn-green w-full">
//         Proceed to Payment
//       </button>
//     </form>
//   </div>
// );





// }




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";

// export default function BookingForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const { user } = useAuth();

//   const userId = user?.uid;

//   const [quantity, setQuantity] = useState(1);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [notes, setNotes] = useState("");

//   const { data: product, isLoading } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (product) {
//       setQuantity(product.minimumOrder || product.minOrder || 1);
//     }
//   }, [product]);

//   if (isLoading || !product) return <p>Loading product...</p>;

//   const minOrder = product.minimumOrder || product.minOrder || 1;
//   const totalPrice = quantity * product.price;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let safeQuantity = parseInt(quantity, 10);
//     if (isNaN(safeQuantity)) safeQuantity = minOrder;
//     safeQuantity = Math.min(
//       Math.max(safeQuantity, minOrder),
//       product.availableQuantity
//     );

//     const orderData = {
//       userid: userId,
//       email: user?.email,
//       productId: product._id,
//       productTitle: product.name,
//       price: Number(product.price),
//       quantity: safeQuantity,
//       orderPrice: Number(product.price) * safeQuantity,
//       firstName,
//       lastName,
//       contactNumber,
//       deliveryAddress,
//       notes,
//       paymentType: product.payment.type, // online | offline
//       paymentMethods: product.payment.methods,
//       paymentStatus:
//         product.payment.type === "online" ? "Pending" : "Paid",
//       orderStatus: "Placed",
//     };

//     try {
//       // ✅ CONDITION BASED ON PAYMENT TYPE
//       if (product.payment.type === "online") {
//         // 👉 ONLINE → STRIPE PAYMENT
//         const res = await axiosSecure.post(
//           "/create-checkout-session",
//           orderData
//         );
//         window.location.href = res.data.url; // Stripe checkout
//       } else {
//         // 👉 OFFLINE → DIRECT SUCCESS
//         const res = await axiosSecure.post("/orders", orderData);
//         if (res.data.insertedId) {
//           navigate("/payment-success");
//         }
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed. Check console.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-4">Booking: {product.name}</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           value={user?.email || ""}
//           readOnly
//           className="w-full border rounded p-2 bg-gray-100"
//         />

//         <input
//           type="text"
//           value={product.name}
//           readOnly
//           className="w-full border rounded p-2 bg-gray-100"
//         />

//         <input
//           type="text"
//           value={`$${product.price} per unit`}
//           readOnly
//           className="w-full border rounded p-2 bg-gray-100"
//         />

//         <input
//           type="text"
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />

//         <input
//           type="number"
//           value={quantity}
//           min={minOrder}
//           max={product.availableQuantity}
//           onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//           className="w-full border rounded p-2"
//           required
//         />

//         <input
//           type="text"
//           value={`Total Price: $${totalPrice}`}
//           readOnly
//           className="w-full border rounded p-2 bg-gray-100"
//         />

//         <input
//           type="text"
//           placeholder="Contact Number"
//           value={contactNumber}
//           onChange={(e) => setContactNumber(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Delivery Address"
//           value={deliveryAddress}
//           onChange={(e) => setDeliveryAddress(e.target.value)}
//           className="w-full border rounded p-2"
//           required
//         />

//         <div className="p-3 bg-gray-50 rounded">
//           <p className="font-medium">
//             Payment Type:
//             <span className="ml-2">
//               {product.payment.type === "online"
//                 ? "Online (Stripe)"
//                 : "Cash on Delivery"}
//             </span>
//           </p>

//           <ul className="list-disc ml-6 text-sm text-gray-600">
//             {product.payment.methods.map((m, i) => (
//               <li key={i}>{m}</li>
//             ))}
//           </ul>
//         </div>

//         <textarea
//           placeholder="Additional Notes / Instructions"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           className="w-full border rounded p-2"
//         />

//         <button type="submit" className="btn btn-green w-full">
//           {product.payment.type === "online"
//             ? "Proceed to Stripe Payment"
//             : "Confirm Order"}
//         </button>
//       </form>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";

// export default function BookingForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const { user } = useAuth();

//   const userId = user?.uid;

//   const [quantity, setQuantity] = useState(1);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [notes, setNotes] = useState("");

//   const { data: product, isLoading } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     if (product) {
//       setQuantity(product.minimumOrder || product.minOrder || 1);
//     }
//   }, [product]);

//   if (isLoading || !product) return <p>Loading product...</p>;

//   const minOrder = product.minimumOrder || product.minOrder || 1;
//   const totalPrice = quantity * product.price;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let safeQuantity = parseInt(quantity, 10);
//     if (isNaN(safeQuantity)) safeQuantity = minOrder;
//     safeQuantity = Math.min(
//       Math.max(safeQuantity, minOrder),
//       product.availableQuantity
//     );

//     const orderData = {
//       userid: userId,
//       email: user?.email,
//       productId: product._id,
//       productTitle: product.name,
//       price: Number(product.price),
//       quantity: safeQuantity,
//       orderPrice: Number(product.price) * safeQuantity,
//       firstName,
//       lastName,
//       contactNumber,
//       deliveryAddress,
//       notes,
//       paymentType: product.payment.type,
//       paymentMethods: product.payment.methods,
//       paymentStatus:
//         product.payment.type === "online" ? "Pending" : "Paid",
//       orderStatus: "Placed",
//     };

//     try {
//       if (product.payment.type === "online") {
//         const res = await axiosSecure.post(
//           "/create-checkout-session",
//           orderData
//         );
//         window.location.href = res.data.url;
//       } else {
//         const res = await axiosSecure.post("/orders", orderData);
//         if (res.data.insertedId) navigate("/payment-success");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed. Check console.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-10 from-sky-100 via-indigo-100 to-purple-100 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
//           Booking – {product.name}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             value={user?.email || ""}
//             readOnly
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//           />

//           <input
//             type="text"
//             value={product.name}
//             readOnly
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//           />

//           <input
//             type="text"
//             value={`$${product.price} per unit`}
//             readOnly
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//               required
//             />
//           </div>

//           <input
//             type="number"
//             value={quantity}
//             min={minOrder}
//             max={product.availableQuantity}
//             onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//             required
//           />

//           <input
//             type="text"
//             value={`Total Price: $${totalPrice}`}
//             readOnly
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//           />

//           <input
//             type="text"
//             placeholder="Contact Number"
//             value={contactNumber}
//             onChange={(e) => setContactNumber(e.target.value)}
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//             required
//           />

//           <input
//             type="text"
//             placeholder="Delivery Address"
//             value={deliveryAddress}
//             onChange={(e) => setDeliveryAddress(e.target.value)}
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//             required
//           />

//           <div className="p-4 bg-white/60 rounded-xl border">
//             <p className="font-semibold text-gray-700">
//               Payment Type: {product.payment.type === "online" ? "Online (Stripe)" : "Cash on Delivery"}
//             </p>
//             <ul className="list-disc ml-6 text-sm text-gray-600 mt-1">
//               {product.payment.methods.map((m, i) => (
//                 <li key={i}>{m}</li>
//               ))}
//             </ul>
//           </div>

//           <textarea
//             placeholder="Additional Notes / Instructions"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full px-4 py-3 border-gray-300/60 rounded-xl bg-white/80 border"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600  text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
//           >
//             {product.payment.type === "online"
//               ? "Proceed to Stripe Payment"
//               : "Confirm Order"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }













import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const userId = user?.uid;

  const [quantity, setQuantity] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (product) {
      setQuantity(product.minimumOrder || product.minOrder || 1);
    }
  }, [product]);

  if (isLoading || !product) return <p>Loading product...</p>;

  const minOrder = product.minimumOrder || product.minOrder || 1;
  const totalPrice = quantity * product.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let safeQuantity = parseInt(quantity, 10);
    if (isNaN(safeQuantity)) safeQuantity = minOrder;
    safeQuantity = Math.min(
      Math.max(safeQuantity, minOrder),
      product.availableQuantity
    );

    const orderData = {
      userid: userId,
      email: user?.email,
      productId: product._id,
      productTitle: product.name,
      price: Number(product.price),
      quantity: safeQuantity,
      orderPrice: Number(product.price) * safeQuantity,
      firstName,
      lastName,
      contactNumber,
      deliveryAddress,
      notes,
      paymentType: product.payment.type,
      paymentMethods: product.payment.methods,
      paymentStatus:
        product.payment.type === "online" ? "Pending" : "Paid",
      orderStatus: "Placed",
    };

    try {
      if (product.payment.type === "online") {
        const res = await axiosSecure.post(
          "/create-checkout-session",{
            productTitle: product.name,
  price: product.price,
  quantity: safeQuantity,
  email: user.email,
  orderData, 
          }
        //   orderData
        );
        window.location.href = res.data.url;
      } 
      
      // else {
      //   const res = await axiosSecure.post("/orders", orderData);
      //   if (res.data.insertedId) navigate("/payment-success");
      // }
      else {
      // ✅ SweetAlert confirmation
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to place this order?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, place order!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post("/orders", orderData);
        if (res.data.insertedId) {
          await Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          navigate("/dashboard/myOrders");
        }
      }
    }
  }

     catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex p-14 items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
          Booking – {product.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* USER INFO */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-indigo-700">User Information</h3>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
                required
              />
            </div>

            <input
              type="number"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
              required
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-indigo-700">Product Information</h3>

            <input
              type="text"
              value={product.name}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={`$${product.price} per unit`}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
              />

              <input
                type="number"
                value={quantity}
                min={minOrder}
                max={product.availableQuantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
                required
              />
            </div>

            <input
              type="text"
              value={`Total Price: $${totalPrice}`}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
            />
          </div>

          {/* PAYMENT INFO */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-indigo-700">Payment Information</h3>

            <div className="p-5 bg-white/60 rounded-xl border border-gray-300/50">
              <p className="font-semibold text-gray-700">
                Payment Type: {product.payment.type === "online" ? "Online (Stripe)" : "Cash on Delivery"}
              </p>
              <ul className="list-disc ml-6 text-sm text-gray-600 mt-1">
                {product.payment.methods.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* NOTES */}
          <textarea
            placeholder="Additional Notes / Instructions"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            {product.payment.type === "online"
              ? "Proceed to Stripe Payment"
              : "Confirm Order"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}




