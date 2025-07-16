import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaGoogle, FaGithub, FaImage } from "react-icons/fa";
import ImageCropper from '../../components/ImageCropper';

// Add testimonial data
const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    quote: "Fashion is the armor to survive everyday life.",
    author: "Sarah Johnson",
    role: "Fashion Blogger"
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000",
    quote: "Style is a way to say who you are without having to speak.",
    author: "Emma Davis",
    role: "Fashion Designer"
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000",
    quote: "Elegance is the only beauty that never fades.",
    author: "Michael Chen",
    role: "Style Consultant"
  }
];

const SignUp = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  // Auto-rotate testimonials
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ image: "حجم الصورة يجب أن لا يتجاوز 5 ميجابايت" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImage) => {
    setProfileImage(croppedImage);
    setShowCropper(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^01[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid Egyptian phone number";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          address: formData.address,
          photo: profileImage || "https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/livewire-tmp/5dzoZ9qWI2FQxwceFDb3zULRtwCRmF-metaZjA5NjMyX3BhcmVudF8xXzE2NTMwMDMzODguanBn-.jpg"
        };

        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMsg("تم إنشاء الحساب بنجاح!");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          setErrors({ 
            submit: data.message || "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى." 
          });
        }
      } catch (error) {
        setErrors({ 
          submit: "حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى." 
        });
      }
      setLoading(false);
    }
  };

  // Animation variants
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

      {/* Sign Up Form */}
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
              Create Account
            </h2>
            <p className="text-gray-500 mt-2 text-base">Join us and start your journey</p>
          </motion.div>

          {/* Success Message */}
          {successMsg && (
            <motion.div
              className="mb-4 bg-green-100 text-green-700 px-4 py-2.5 rounded-lg text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMsg}
            </motion.div>
          )}

          {/* Profile Image Upload */}
          <motion.div className="mb-6 flex flex-col items-center" variants={itemVariants}>
            {showCropper ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              >
                <div className="bg-white rounded-xl p-6 max-w-lg w-full">
                  <h3 className="text-lg font-semibold mb-4 text-center">قص الصورة الشخصية</h3>
                  <ImageCropper image={tempImage} onCrop={handleCrop} />
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      onClick={() => setShowCropper(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="relative w-20 h-20 mb-3">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-dashed border-gray-300">
                    <FaImage className="text-2xl text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">
                  <FaImage className="text-white text-sm" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            )}
            <p className="text-sm text-gray-500">تحميل صورة شخصية</p>
            {errors.image && (
              <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {errors.image}
              </motion.p>
            )}
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="email"
                name="email"
                placeholder="Email Address"
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
              <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.phone}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.address ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.address}
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

            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-10 pr-4 py-2.5 text-base rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.confirmPassword}
                </motion.p>
              )}
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
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Social Sign Up */}
          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
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

          {/* Sign In Link */}
          <motion.p className="text-center mt-6 text-gray-600 text-sm" variants={itemVariants}>
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;