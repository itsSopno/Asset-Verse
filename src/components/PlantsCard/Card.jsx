import { Link } from "react-router";
import { motion } from "framer-motion";

const Card = ({ plant }) => {
  const { _id, name, productImage, productQuantity, price, productName } = plant || {};

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
      }}
    >
      <Link to={`/plant/${_id}`}>
        <motion.div
          whileHover={{ scale: 1.02, rotateX: 4, rotateY: -4 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="
            bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg 
            hover:shadow-2xl duration-300 overflow-hidden border border-gray-200 
            group transform-gpu
          "
        >
          {/* Parallax Image */}
          <motion.div
            className="relative overflow-hidden h-60 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src={productImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
              whileInView={{ y: [-20, 20] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 6,
                ease: "easeInOut"
              }}
            />

            {/* Floating Price Tag */}
            <div className="absolute bottom-3 right-3 bg-indigo-400 text-white font-bold px-4 py-1 rounded-full shadow-lg">
              ${price}
            </div>

            {/* Category Tag */}
            <div className="absolute top-3 left-3 bg-white/90 text-indigo-400  font-medium px-3 py-1 rounded-full shadow-md">
              {productName}
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {name}
            </h2>

            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Available:</span> {productQuantity} units
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                mt-2 w-full bg-indigo-400  text-white py-2 rounded-xl font-semibold 
                shadow-md hover:bg-black duration-200
              "
            >
              View Details
            </motion.button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Card;
