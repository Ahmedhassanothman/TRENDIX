import React from "react";

const features = [
  {
    title: "AI Fashion Chatbot",
    desc: "A smart virtual assistant that chats with you in natural language and suggests the best outfits for your taste, occasion, and season.",
    icon: (
      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/></svg>
    ),
    sample: (
      <div className="bg-gray-100 rounded-lg p-3 mt-2 text-sm">
        <span className="font-semibold text-pink-500">AI:</span> Looking for a smart-casual look? Try a grey blazer with black jeans!
      </div>
    )
  },
  {
    title: "Prompt-to-Image Generation",
    desc: "Describe your dream outfit (e.g. 'formal grey winter look') and our AI instantly turns your words into a real, shoppable image.",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><circle cx="8" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
    ),
    sample: (
      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=200" alt="AI Outfit" className="rounded-lg mt-2 w-full object-cover" />
    )
  },
  {
    title: "Personalized Recommendations",
    desc: "From your very first visit, Trendix learns your style and gives you tailored product suggestions every time.",
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l4-16M12 20l-4-16M12 20V4"/></svg>
    ),
    sample: (
      <div className="bg-gray-100 rounded-lg p-3 mt-2 text-sm">
        <span className="font-semibold text-yellow-500">You may like:</span> Soft pink midi dress, White sneakers
      </div>
    )
  }
];

const services = [
  "Instant AI-powered outfit suggestions",
  "Image generation from your ideas",
  "Smart, seamless shopping experience",
  "Fast shipping & real-time support"
];

const steps = [
  { title: "1. Chat", desc: "Tell our AI your style, mood, or event." },
  { title: "2. Visualize", desc: "See outfit ideas or AI-generated images." },
  { title: "3. Shop", desc: "Get personalized recommendations and shop instantly." }
];

const testimonials = [
  {
    name: "Sara M.",
    text: "Trendix's AI stylist helped me find my new favorite look in seconds!",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Lina K.",
    text: "I love seeing my outfit ideas as real images. So creative and fun!",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export default function AboutUs() {
  return (
    <div className="font-[Inter] bg-white min-h-screen text-gray-800">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-black">Meet <span className="text-pink-500">Trendix</span></h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium">The first AI-powered fashion store to help you discover, visualize, and shop your perfect look.</p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow transition mb-4 text-lg">Try AI Stylist</button>
      </section>

      {/* Who We Are */}
      <section className="max-w-3xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-2 text-black">Who We Are</h2>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-pink-500">Trendix</span> is the next-generation fashion e-commerce platform, powered by advanced AI to make your style journey smarter, easier, and more inspiring.
        </p>
      </section>

      {/* What Makes Us Unique */}
      <section className="bg-gray-50 py-12 mb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-black">What Makes Us Unique</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
                {f.icon}
                <h3 className="font-semibold text-lg mt-4 mb-2 text-black">{f.title}</h3>
                <p className="text-gray-500 text-center">{f.desc}</p>
                {f.sample}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-3xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-2 text-black">Our Mission</h2>
        <p className="text-gray-700 text-lg">
          At Trendix, we believe everyone has a unique style. Our mission is to empower you to express yourself with confidence and intelligence.
        </p>
      </section>

      {/* Our Services */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-black">Our Services</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <li key={i} className="flex items-center gap-3 bg-gray-100 rounded-lg p-4 text-gray-700 font-medium">
              <span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span>
              {service}
            </li>
          ))}
        </ul>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-12 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-black">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-2xl font-bold text-pink-500 mb-2">{i + 1}</div>
                <h4 className="font-semibold mb-1 text-black">{step.title}</h4>
                <p className="text-gray-500 text-center">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block h-16 border-l-2 border-pink-200 my-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-gray-500 text-sm">{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 