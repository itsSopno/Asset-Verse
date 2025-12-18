import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const PurchaseModal = ({ isOpen, closeModal, plan }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
const axiosSecure = useAxiosSecure()
  const handleCheckout = async () => {
    if (!user) return toast.error("Login first");

    try {
      setLoading(true);
      const token = await user.getIdToken();

      const res = await axiosSecure.post(
        "/create-checkout-session",
        {
          packageName: plan.name,
          employeeLimit: plan.employeeLimit,
          price: plan.price,
          hrEmail: user.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
        
        {/* BACKDROP WITH GLASS BLUR */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-60"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition duration-300 transform"
            enterFrom="scale-75 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition duration-300 transform"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-75 opacity-0"
          >
            <Dialog.Panel
              className="
                relative w-full max-w-md p-8 rounded-3xl 
                bg-white/5 backdrop-blur-xl 
                border border-white/20 
                shadow-[0_0_40px_rgba(125,125,255,0.25)]
                text-white
              "
            >
              {/* NEON BORDER GLOW */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none border border-indigo-400/30 shadow-[0_0_25px_6px_rgba(99,102,241,0.15)]"></div>

              {/* TOP LIGHT AURA */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[180px] h-[180px] bg-indigo-500/20 blur-[90px] rounded-full"></div>

              {/* HEADER */}
              <Dialog.Title className="text-3xl font-bold mb-4 text-indigo-300">
                Confirm Your Purchase
              </Dialog.Title>

              {/* PLAN INFO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mb-8"
              >
                <p className="text-lg">
                  <span className="font-semibold text-indigo-300">Plan:</span>{" "}
                  {plan.name}
                </p>
                <p>
                  <span className="font-semibold text-indigo-300">Employee Limit:</span>{" "}
                  {plan.employeeLimit}
                </p>
                <p>
                  <span className="font-semibold text-indigo-300">Price:</span>{" "}
                  <span className="text-indigo-400 font-bold">${plan.price}</span>{" "}
                  / month
                </p>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 mt-4"></div>
              </motion.div>

              {/* BUTTONS */}
              <div className="flex items-center gap-4">
                {/* Cancel */}
                <button
                  onClick={closeModal}
                  className="
                    flex-1 py-3 font-semibold rounded-xl 
                    bg-white/5 border border-white/20 
                    hover:bg-white/10 transition
                  "
                >
                  Cancel
                </button>

                {/* Pay */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="
                    flex-1 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    hover:from-indigo-700 hover:to-purple-700
                    shadow-lg shadow-indigo-500/20
                    transition
                  "
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
