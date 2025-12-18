import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import { IoBagCheckOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { getAuth } from "firebase/auth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

 useEffect(() => {
  const sendSuccess = async () => {
    if (!sessionId) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("No user found");
      return;
    }

    // Firebase ID token
    const token = await user.getIdToken();

    axios.post(
      `${import.meta.env.VITE_API_URL}/payment-success`,
      { sessionId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(res => console.log("Payment updated:", res.data))
    .catch(err => console.log("Payment update error:", err.response?.data));
  };

  sendSuccess();
}, [sessionId]);


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A14] overflow-hidden">

      {/* AURA BG LIGHT / THEME WAVE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute w-[500px] h-[500px] bg-gradient-to-br from-lime-500/20 via-emerald-500/10 to-blue-500/20 blur-[130px] rounded-full"
      />

      {/* CARD */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative backdrop-blur-[14px] bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl w-[90%] max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <IoBagCheckOutline className="w-20 h-20 text-lime-400 mx-auto mb-4" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-300 mb-6">
          Your purchase is confirmed. We’re preparing your assets.
        </p>

        <Link
          to="plants"
          className="inline-block px-5 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-lime-400 to-emerald-500 shadow-lg hover:opacity-90 transition-all duration-300"
        >
          Go to My Orders
        </Link>
      </motion.div>
    </div>
  )
}

export default PaymentSuccess
