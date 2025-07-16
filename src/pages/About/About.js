import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "TRENDIX AI RECOMMENDATION",
    desc: "Chat instantly with our intelligent virtual stylist to receive personalized outfit recommendations, styling advice, and answers to all your fashion queries, making finding your next look effortless.",
    icon: (
      <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/></svg>
    ),
    linkTo: { pathname: "/aitool", state: { initialTool: "chat-recommendation" } }
  },
  {
    title: "Text to Image Generation",
    desc: "Transform your creative fashion ideas into visual reality. Simply describe any outfit or style you can imagine, and our AI will generate a unique image based on your text description.",
    icon: (
      <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><circle cx="8" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
    ),
    linkTo: { pathname: "/aitool", state: { initialTool: "text-to-image" } }
  },
  {
    title: "Virtual Try-On",
    desc: "Eliminate guesswork by seeing how clothes fit and look on you before making a purchase. Upload your photo and select a garment from our collection to virtually try it on.",
    icon: (
      <svg className="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-3.04 0-5.5 2.293-5.5 5.16V21h11v-1.84c0-2.867-2.46-5.16-5.5-5.16z" /></svg>
    ),
    linkTo: { pathname: "/aitool", state: { initialTool: "virtual-try-on" } }
  },
  {
    title: "Image to Image Transformation",
    desc: "Modify existing images to explore different styles, patterns, or aesthetics. Use a base image and a prompt to guide the AI in creating a transformed version.",
    icon: (
      <svg className="w-12 h-12 text-yellow-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
    linkTo: { pathname: "/aitool", state: { initialTool: "image-to-image" } }
  },
  {
    title: "Image to Avatar Generator",
    desc: "Generate unique and stylized avatars from your personal photos. Customize your digital identity with various artistic interpretations created by AI.",
    icon: (
      <svg className="w-12 h-12 text-red-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
    linkTo: { pathname: "/aitool", state: { initialTool: "avatar-generator" } }
  },
  {
    title: "Personalized Recommendations",
    desc: "Our AI learns your unique style preferences from your interactions and selections to provide tailored product recommendations, helping you discover items you'll love effortlessly.",
    icon: (
      <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l4-16M12 20l-4-16M12 20V4"/></svg>
    ),
    linkTo: { pathname: "/aitool", state: { initialTool: "chat-recommendation" } }
  }
];

const services = [
  "Revolutionary AI-powered fashion design tools",
  "Instant virtual try-on for a realistic preview",
  "Personalized styling advice and recommendations",
  "Transformative image editing for creative expression",
  "Unique avatar generation from your photos",
  "Seamless and inspiring fashion discovery experience",
];

const steps = [
  { title: "1. Explore AI Tools", desc: "Choose from our suite of AI features: Chatbot, Virtual Try-On, Image Generation, and more." },
  { title: "2. Interact & Create", desc: "Chat with the AI, upload images, or enter prompts to explore fashion possibilities." },
  { title: "3. Discover & Visualize", desc: "Receive personalized recommendations or visualize how outfits look on you." },
  { title: "4. Shop Your Style", desc: "Easily find and shop the looks you love, guided by AI insights." }
];

const testimonials = [
  {
    name: "Sara M.",
    text: "Trendix's virtual try-on is a game-changer! I can finally see how clothes fit before buying online.",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Ahmed L.",
    text: "The AI chat gives the best recommendations. It's like having a personal stylist 24/7!",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Fatima S.",
    text: "Generating outfits from text is incredibly fun and inspiring. Trendix unlocked my creativity!",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export default function About() {
  return (
    <div className="font-[Inter] bg-gray-50 min-h-screen text-gray-800 relative overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900 drop-shadow-lg">
            Welcome to <span className="text-blue-700">Trendix</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium">
            Your personal AI-powered platform for revolutionary fashion design, discovery, and style.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Who We Are</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          <span className="font-semibold text-blue-700">Trendix</span> is at the forefront of integrating artificial intelligence with the world of fashion. We are a team passionate about empowering individuals to express their unique style through innovative technology. Our platform is designed to offer a seamless and inspiring journey from imagination to realization, making advanced fashion design tools accessible to everyone.
        </p>
      </section>

      {/* What Makes Us Unique - Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our AI Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 fade-in-up">
                {f.icon}
                <h3 className="font-semibold text-xl mt-4 mb-3 text-gray-900">{f.title}</h3>
                <p className="text-gray-600 text-base mb-6">{f.desc}</p>
                <Link to={f.linkTo} className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md">
                  Try it Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-blue-700 text-white rounded-lg shadow-xl mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-blue-100 text-lg leading-relaxed text-center">
          Our mission is to democratize fashion design and make personal style exploration more intuitive and exciting than ever before. By leveraging the power of AI, we aim to provide tools that inspire creativity, build confidence, and connect users with fashion in entirely new ways.
        </p>
      </section>

      {/* Why Choose Trendix - Services (Re-purposed)*/}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Why Choose Trendix?</h2>
        <ul className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <li key={i} className="flex items-center gap-4 bg-gray-100 rounded-xl p-6 text-gray-700 font-medium shadow hover:shadow-md transition-shadow duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-blue-600 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {service}
            </li>
          ))}
        </ul>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 mb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-8 fade-in-up">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4 shadow-md">{i + 1}</div>
                <h4 className="font-semibold mb-3 text-gray-900 text-lg">{step.title}</h4>
                <p className="text-gray-600 text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-6 hover:shadow-xl transition-shadow duration-200 fade-in-up">
              <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-900 mb-1">{t.name}</div>
                <div className="text-gray-600 text-base italic">"{t.text}"</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple fade-in animation */}
      <style>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
