import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import BecomeSellerModal from '../../components/Modal/BecomeSellerModal'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { motion } from "framer-motion"
import useRole from '../../hooks/useRole'

const PlantDetails = () => {
  const [role] = useRole()
  const [sellerOpen, setSellerOpen] = useState(false)
  const { id } = useParams()

  const { data: plant = {}, isLoading } = useQuery({
    queryKey: ['plant', id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/plants/${id}`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const { productImage, productName, companyName, productQuantity, seller, hrEmail } = plant

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }}
      className="relative"
    >

      {/* 🔥 Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-14 w-[300px] h-[300px]  bg-indigo-500/40 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-24 right-14 w-[300px] h-[300px]  bg-pink-500/30 blur-[150px] rounded-full"></div>
      </div>

      <Container>
        <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-14 py-12">

          {/* LEFT IMAGE SIDE */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10 bg-white/10 backdrop-blur-lg">
              
              {/* Product Image */}
              <motion.img
                src={productImage}
                alt={productName}
                className="w-full h-full object-cover rounded-3xl"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />

              {/* Price Badge */}
              {/* <motion.div 
                className="absolute top-5 right-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold px-6 py-2 rounded-full shadow-xl text-lg backdrop-blur-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ${price}
              </motion.div> */}
            </div>
          </motion.div>

          {/* RIGHT DETAILS */}
          <motion.div 
            className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/20"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >

            <Heading title={productName} subtitle={companyName} />

            <hr className="my-6 border-white/30" />

            {/* HR INFO */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <img 
                src={seller?.image}
                width="55"
                height="55"
                className="rounded-full shadow-lg border border-white/40"
                referrerPolicy="no-referrer"
              />
              <p className="text-xl font-semibold text-white/90">
                HR Managed By: <span className="text-pink-500/30">{seller?.name}||{hrEmail}</span>
              </p>
            </motion.div>

            <hr className="my-6 border-white/30" />

            {/* STOCK */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-lg text-white/80"
            >
              <span className="font-semibold text-white">Available Stock:</span> {productQuantity} units
            </motion.p>

            <hr className="my-6 border-white/30" />

            {/* PURCHASE AREA */}
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
             

             
              <motion.div 
                whileHover={{ scale: 1.08 }} 
                whileTap={{ scale: 0.95 }}
                className="text-green-300 underline"
              >
                <Link to="/dashboard">Go Back</Link>
              </motion.div>
            </motion.div>

            <hr className="my-6 border-white/30" />

            {/* Asset Permission Button */}
            
              {role === "hr" ? (
                <h1 className='text-red-300 text-sm italic'>HR cannot request assets</h1>
              ) : (
                <motion.div
              onClick={() => setSellerOpen(true)}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer  bg-indigo-500/40  text-white text-center py-3 rounded-xl mt-6 shadow-lg"
            >
              Asset Permission
            </motion.div>
            
              )}
             
            
           

            {/* MODAL */}
            <BecomeSellerModal 
              isOpen={sellerOpen} 
              closeModal={() => setSellerOpen(false)} 
              product={plant}
            />
          </motion.div>

        </div>
      </Container>
    </motion.div>
  )
}

export default PlantDetails
