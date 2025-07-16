import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
    quote: "Fashion is part of the daily air and it changes all the time.",
    author: "Lisa Chen",
    role: "Fashion Editor"
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000",
    quote: "Fashion is about dressing according to what's fashionable.",
    author: "James Wilson",
    role: "Fashion Photographer"
  },
  {
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000",
    quote: "Fashion is the armor to survive everyday reality.",
    author: "Maria Garcia",
    role: "Fashion Designer"
  }
];

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Store user data and token
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          
          // Get redirect path from location state or default to home
          const redirectTo = location.state?.redirectTo || '/';
          navigate(redirectTo);
        } else {
          setErrors({ submit: data.message || "Invalid login credentials" });
        }
      } catch (error) {
        setErrors({ submit: "Error connecting to the server. Please try again." });
      }
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Testimonial Section */}
      <motion.div
        className="hidden lg:block h-screen w-2/5"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full h-full">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <img
              src={testimonials[currentTestimonial].image}
              alt="Fashion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <p className="text-lg font-light italic mb-3">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <h3 className="font-semibold text-sm">{testimonials[currentTestimonial].author}</h3>
              <p className="text-xs opacity-80">{testimonials[currentTestimonial].role}</p>
            </div>
          </motion.div>
          
          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? "bg-white w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sign In Form */}
      <motion.div
        className="w-full lg:w-3/5 h-screen bg-white p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
          {/* Header */}
          <motion.div className="text-center mb-6" variants={itemVariants}>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mt-2 text-base">Sign in to continue</p>
          </motion.div>

          {/* Error Message */}
          {errors.submit && (
            <motion.div
              className="mb-4 bg-red-100 text-red-700 px-4 py-2.5 rounded-lg text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.submit}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 transition-colors">
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Social Sign In */}
          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <FaGoogle className="text-red-500 mr-2" />
                <span className="text-sm font-medium">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <FaGithub className="mr-2" />
                <span className="text-sm font-medium">GitHub</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p className="text-center mt-6 text-gray-600 text-sm" variants={itemVariants}>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign Up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;