import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLoadingStore from "@/store/loadingStore";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const res = await axios.post("/auth/login", 
        formData,
      );
      toast.success("You logged in successfully");
      localStorage.setItem("token", res?.data?.token);
      navigate("/");
    } catch (error) {
      toast.error("Login failed");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex lg:gap-24 min-h-screen justify-center items-center">
      {/* Left Side Image */}
      <div className="max-w-md hidden md:hidden lg:block w-full">
        <img src="/images/login(2).svg" alt="" />
      </div>

      {/* Right Side Form */}
      <div className="flex  flex-col w-full lg:w-auto justify-center items-center     px-8 py-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Login to Your Account
        </h2>

        <form
          onSubmit={handleLogin}
          className=" w-full lg:w-[350px] max-w-[350px]"
        >
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              User Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
              <span className="px-3 text-gray-500">
                <FaEnvelope />
              </span>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
                type="text"
                name="user_name"
                placeholder="Enter your User Name"
                className="flex-1 bg-transparent p-3 outline-none text-sm text-gray-700"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
              <span className="px-3 text-gray-500">
                <FaLock />
              </span>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="flex-1 bg-transparent p-3 outline-none text-sm text-gray-700"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary justify-center w-full text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
