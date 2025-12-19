// src/Pages/PaymentCanceled.jsx
import React from "react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-300 px-4">
      <div className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 text-center">
        <h1 className="text-3xl font-extrabold text-red-700 mb-4">
          ❌ Payment Canceled
        </h1>
        <p className="text-gray-700 mb-2">
          Your payment was not completed. Your order has not been placed.
        </p>
        <p className="text-gray-500">
          You can try again or choose a different payment method.
        </p>
      </div>
    </div>
  );
}
