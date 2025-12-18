import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";

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
      toast.error(err?.message || "Signup failed");
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
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f1c] p-6 relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

      <div className="w-full max-w-lg bg-[#0f0f1c] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative z-10 text-white">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Your Account
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Join the AssetVerse ecosystem
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm bg-white/5 rounded-xl border border-white/10 p-2.5 cursor-pointer file:bg-indigo-600 file:text-white file:border-none file:px-4 file:py-1.5 file:rounded-lg file:mr-4"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all"
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" }
              })}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <TbFidgetSpinner className="animate-spin mx-auto" size={24} /> : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* OR LINE */}
        <div className="flex items-center space-x-3 my-7">
          <div className="flex-1 h-px bg-white/10" />
          <p className="text-gray-500 text-xs font-bold uppercase">OR</p>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-all font-medium cursor-pointer"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            state={from}
            className="text-indigo-400 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;