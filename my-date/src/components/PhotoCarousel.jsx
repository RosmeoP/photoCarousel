import { useState, useEffect } from "react";

export default function DateCarousel() {
  const photos = [
    {
      src: "/img/bicepPic.JPG",
      caption: "She looks beautiful at my side ❤️",
    },
    {
      src: "/img/hands.JPG",
      caption: "Holding hands with Dianne ",
    },
    {
      src: "/img/hug.jpg",
      caption: "A warm hug to remember",
    }
  ];

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const nextPhoto = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setIsLoading(false);
    }, 150);
  };

  const prevPhoto = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
      setIsLoading(false);
    }, 150);
  };

  const goToPhoto = (photoIndex) => {
    if (photoIndex !== index) {
      setIsLoading(true);
      setTimeout(() => {
        setIndex(photoIndex);
        setIsLoading(false);
      }, 150);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-pink-200 min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-pink-200 bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 bg-opacity-15 rounded-full animate-ping"></div>
      </div>

      {/* Enhanced Wave Divider */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full drop-shadow-lg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9"/>
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,32L60,58.7C120,85,240,139,360,144C480,149,600,107,720,122.7C840,139,960,213,1080,213.3C1200,213,1320,139,1380,101.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            className="animate-pulse"
          ></path>
        </svg>
      </div>

      {/* Center Content */}
      <div className="flex flex-col justify-center items-center flex-1 px-4 relative z-10">
        {/* Enhanced Title */}
        <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-yellow-900 drop-shadow-lg tracking-tight">
            First date with Dianne
            <span className="ml-2 text-3xl animate-pulse">🌺</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <span className="text-sm">📅</span>
            <p className="text-lg font-medium italic tracking-wide">
              Saturday 13th of September, 2025
            </p>
          </div>
        </div>

        {/* Enhanced Photo Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 max-w-lg w-full transform hover:scale-[1.02] transition-all duration-300 border border-white/20">
          
          {/* Photo Counter */}
          <div className="flex justify-center mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium">
              {index + 1} of {photos.length}
            </span>
          </div>

          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl mb-4 group">
            <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <img
                src={photos[index].src}
                alt="Date memory"
                className="w-full object-contain rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-105"
                style={{ maxHeight: "50vh" }}
              />
            </div>
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-2xl">
                <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </div>

          {/* Enhanced Caption */}
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-gray-700 leading-relaxed">
              {photos[index].caption}
            </p>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPhoto(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'bg-gradient-to-r from-blue-400 to-pink-400 scale-125 shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={prevPhoto}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">◀</span>
                <span className="hidden sm:inline">Previous</span>
              </span>
            </button>
            <button
              onClick={nextPhoto}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="hidden sm:inline">Next</span>
                <span className="text-lg">▶</span>
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>💕 Made with love for our special moments 💕</p>
        </div>
      </div>
    </div>
  );
}
