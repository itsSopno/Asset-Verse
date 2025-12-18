import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // GSAP refs
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(headingRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.7,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(formRef.current.children, {
      opacity: 0,
      y: 15,
      duration: 0.6,
      stagger: 0.12,
      delay: 0.3,
      ease: "power2.out",
    });
  }, []);

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const result = await createUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageURL });

      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f1c] p-6 relative overflow-hidden">
      {/* Glass Glow */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:blur-[100px] before:opacity-20 pointer-events-none" />

      <div
        ref={containerRef}
        className="w-full max-w-lg bg-[#0f0f1c]/40 backdrop-blur-xl p-10 rounded-2xl border border-indigo-500/20 shadow-[0_0_40px_rgba(80,80,255,0.35)] relative z-10 text-white"
      >
        {/* HEADER */}
        <div className="mb-8 text-center space-y-2" ref={headingRef}>
          <h1 className="text-4xl font-bold text-indigo-400 drop-shadow-xl">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm">Join AssetVerse ecosystem</p>
        </div>

        {/* FORM */}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white/10 border border-indigo-500/20 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 20, message: "Name too long" },
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm bg-white/5 rounded-lg border border-dashed border-indigo-500/30 p-3 cursor-pointer file:bg-indigo-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md"
              {...register("image")}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/10 border border-indigo-500/20 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="*******"
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-white/10 border border-indigo-500/20 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white  hover:bg-indigo-700 py-3 rounded-lg transition font-semibold shadow-lg flex justify-center items-center"
          >
           Create ACCOUNT
          </button>
        </form>

        {/* OR LINE */}
        <div className="flex items-center space-x-3 my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <p className="text-gray-400 text-sm">OR</p>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 border border-indigo-500/20 bg-white/10 rounded-lg hover:bg-white/20 transition cursor-pointer"
        >
          <FcGoogle size={30} />
          <span>Continue with Google</span>
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            state={from}
            className="inline-block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold transition shadow-lg"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
