const features = [
  {
    title: "AI Fashion Chatbot",
    desc: "Chat with our smart virtual stylist to get instant, personalized outfit advice for any occasion.",
    icon: (
      <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/></svg>
    ),
    sample: (
      <div className="bg-blue-100 rounded-lg p-3 mt-2 text-sm shadow">
        <span className="font-semibold text-blue-900">AI:</span> Try a grey blazer with black jeans for a smart-casual look!
      </div>
    )
  },
  {
    title: "Prompt-to-Image Generation",
    desc: "Describe your dream outfit and our AI turns your words into a real, shoppable image.",
    icon: (
      <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><circle cx="8" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
    ),
    sample: (
      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=200" alt="AI Outfit" className="rounded-lg mt-2 w-full object-cover shadow" />
    )
  },
  {
    title: "Personalized Recommendations",
    desc: "From your first visit, Trendix learns your style and gives you tailored product suggestions every time.",
    icon: (
      <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l4-16M12 20l-4-16M12 20V4"/></svg>
    ),
    sample: (
      <div className="bg-yellow-50 rounded-lg p-3 mt-2 text-sm shadow">
        <span className="font-semibold text-yellow-500">You may like:</span> Soft pink midi dress, White sneakers
      </div>
    )
  },
  {
    title: "Virtual Try-On",
    desc: "See how clothes look on you virtually before buying. Upload your photo and the garment to see the magic.",
    icon: (
      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-3.04 0-5.5 2.293-5.5 5.16V21h11v-1.84c0-2.867-2.46-5.16-5.5-5.16z" /></svg>
    )
  },
  {
    title: "Image to Image Transformation",
    desc: "Transform existing images into new styles or concepts using AI, allowing for creative visual exploration.",
    icon: (
      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
    )
  },
  {
    title: "Image to Avatar Generator",
    desc: "Create unique avatars from your photos, perfect for personalizing your profile or exploring digital identities.",
    icon: (
      <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )
  }
];
