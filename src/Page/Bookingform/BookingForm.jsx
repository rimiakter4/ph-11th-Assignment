
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";

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
//           "/create-checkout-session",{
//             productTitle: product.name,
//   price: product.price,
//   quantity: safeQuantity,
//   email: user.email,
//   orderData, 
//           }
//         //   orderData
//         );
//         window.location.href = res.data.url;
//       } 
      
//       // else {
//       //   const res = await axiosSecure.post("/orders", orderData);
//       //   if (res.data.insertedId) navigate("/payment-success");
//       // }
//       else {
//       // ✅ SweetAlert confirmation
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: "Do you want to place this order?",
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, place order!',
//         cancelButtonText: 'Cancel',
//       });

//       if (result.isConfirmed) {
//         const res = await axiosSecure.post("/orders", orderData);
//         if (res.data.insertedId) {
//           await Swal.fire({
//             title: 'Success!',
//             text: 'Your order has been placed.',
//             icon: 'success',
//             timer: 2000,
//             showConfirmButton: false
//           });
//           navigate("/dashboard/myOrders");
//         }
//       }
//     }
//   }

//      catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed. Check console.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex p-14 items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
//           Booking – {product.name}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* USER INFO */}
//           <div className="space-y-3">
//             <h3 className="text-lg font-semibold text-indigo-700">User Information</h3>

//             <input
//               type="email"
//               value={user?.email || ""}
//               readOnly
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//                 required
//               />
//             </div>

//             <input
//               type="number"
//               placeholder="Contact Number"
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               required
//             />

//             <input
//               type="text"
//               placeholder="Delivery Address"
//               value={deliveryAddress}
//               onChange={(e) => setDeliveryAddress(e.target.value)}
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               required
//             />
//           </div>

//           {/* PRODUCT INFO */}
//           <div className="space-y-3">
//             <h3 className="text-lg font-semibold text-indigo-700">Product Information</h3>

//             <input
//               type="text"
//               value={product.name}
//               readOnly
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 value={`$${product.price} per unit`}
//                 readOnly
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
//               />

//               <input
//                 type="number"
//                 value={quantity}
//                 min={minOrder}
//                 max={product.availableQuantity}
//                 onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//                 required
//               />
//             </div>

//             <input
//               type="text"
//               value={`Total Price: $${totalPrice}`}
//               readOnly
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
//             />
//           </div>

//           {/* PAYMENT INFO */}
//           <div className="space-y-3">
//             <h3 className="text-lg font-semibold text-indigo-700">Payment Information</h3>

//             <div className="p-5 bg-white/60 rounded-xl border border-gray-300/50">
//               <p className="font-semibold text-gray-700">
//                 Payment Type: {product.payment.type === "online" ? "Online (Stripe)" : "Cash on Delivery"}
//               </p>
//               <ul className="list-disc ml-6 text-sm text-gray-600 mt-1">
//                 {product.payment.methods.map((m, i) => (
//                   <li key={i}>{m}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* NOTES */}
//           <textarea
//             placeholder="Additional Notes / Instructions"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
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

  if (isLoading || !product) return <p className="text-center p-10">Loading product...</p>;

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

    // ✅ এখানে sellerEmail যোগ করা হয়েছে যা ম্যানেজারের ফিল্টারিংয়ের জন্য দরকার
    const orderData = {
      userid: userId,
      email: user?.email, // বায়ারের ইমেইল
      productId: product._id,
      productTitle: product.name,
      // প্রোডাক্ট থেকে সেলার বা ম্যানেজারের ইমেইল নেওয়া হচ্ছে
      sellerEmail: product.sellerEmail || product.email, 
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
      paymentStatus: product.payment.type === "online" ? "unpaid" : "cod",
      orderStatus: "pending", // এটি ডাটাবেজে পেন্ডিং হিসেবে সেভ হবে
    };

    try {
      if (product.payment.type === "online") {
        // স্ট্রাইপ পেমেন্টের জন্য
        const res = await axiosSecure.post("/create-checkout-session", {
          productTitle: product.name,
          price: product.price,
          quantity: safeQuantity,
          email: user.email,
          sellerEmail: product.sellerEmail || product.email,
          orderData, 
        });
        window.location.href = res.data.url;
      } else {
        // ✅ ক্যাশ অন ডেলিভারি (SweetAlert Confirmation)
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to place this order?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#4f46e5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, place order!',
          cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
          const res = await axiosSecure.post("/orders", orderData);
          if (res.data.insertedId) {
            await Swal.fire({
              title: 'Success!',
              text: 'Your order has been placed successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            navigate("/dashboard/myOrders");
          }
        }
      }
    } catch (err) {
      console.error("Order process error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while placing the order!',
      });
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
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
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
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
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
              value={`Total Price: $${totalPrice.toFixed(2)}`}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60"
            />
          </div>

          {/* PAYMENT INFO */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-indigo-700">Payment Information</h3>
            <div className="p-5 bg-white/60 rounded-xl border border-gray-300/50">
              <p className="font-semibold text-gray-700">
                Type: {product.payment.type === "online" ? "Online (Stripe)" : "Cash on Delivery"}
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
            className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition transform active:scale-95 shadow-lg"
          >
            {product.payment.type === "online" ? "Proceed to Stripe Payment" : "Confirm Order"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
