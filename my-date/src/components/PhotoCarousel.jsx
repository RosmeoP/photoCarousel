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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !isLoading) nextPhoto();
    if (isRightSwipe && !isLoading) prevPhoto();
    
    setTouchStart(0);
    setTouchEnd(0);
  };

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
      {/* Animated Background Elements - Smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 w-10 h-10 sm:w-16 sm:h-16 bg-pink-200 bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-16 left-8 sm:bottom-20 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 bg-blue-200 bg-opacity-15 rounded-full animate-ping"></div>
      </div>

      {/* Enhanced Wave Divider - Smaller on mobile */}
      <div className="relative flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full drop-shadow-lg h-24 sm:h-auto"
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
        
        {/* Floating Hearts - Hidden on very small screens */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-400 animate-bounce hidden xs:block">
          💕
        </div>
      </div>

      {/* Center Content - Mobile optimized spacing */}
      <div className="flex flex-col justify-center items-center flex-1 px-3 sm:px-4 py-4 relative z-10 min-h-0">
        {/* Enhanced Title - Mobile responsive */}
        <div className="text-center mb-4 sm:mb-8 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 text-yellow-900 drop-shadow-lg tracking-tight leading-tight">
            First date with Dianne
            <span className="ml-1 sm:ml-2 text-xl sm:text-2xl md:text-3xl animate-pulse">🌺</span>
          </h1>
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-gray-700">
            <span className="text-xs sm:text-sm">📅</span>
            <p className="text-sm sm:text-base lg:text-lg font-medium italic tracking-wide">
              Saturday 13th of September, 2025
            </p>
          </div>
        </div>

        {/* Enhanced Photo Container - Mobile optimized */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg transform hover:scale-[1.02] transition-all duration-300 border border-white/20 flex-1 flex flex-col min-h-0">
          
          {/* Photo Counter - Mobile friendly */}
          <div className="flex justify-center mb-3 sm:mb-4 flex-shrink-0">
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {index + 1} of {photos.length}
            </span>
          </div>

          {/* Image Container - Touch enabled with swipe */}
          <div 
            className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group flex-1 flex items-center justify-center min-h-0 cursor-pointer select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`transition-opacity duration-300 w-full h-full flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <img
                src={photos[index].src}
                alt="Date memory"
                className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-105"
                draggable={false}
              />
            </div>
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl sm:rounded-2xl">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 sm:border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Swipe Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/60 text-xs bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm sm:hidden">
              ← Swipe →
            </div>

            {/* Touch-friendly navigation arrows - larger on mobile */}
            <button
              onClick={prevPhoto}
              disabled={isLoading}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-2 shadow-lg transition-all text-gray-700 hover:text-gray-900 disabled:opacity-50 touch-manipulation"
            >
              <span className="text-lg sm:text-xl">◀</span>
            </button>
            <button
              onClick={nextPhoto}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-2 shadow-lg transition-all text-gray-700 hover:text-gray-900 disabled:opacity-50 touch-manipulation"
            >
              <span className="text-lg sm:text-xl">▶</span>
            </button>

            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
          </div>

          {/* Enhanced Caption - Mobile optimized */}
          <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 leading-relaxed px-2">
              {photos[index].caption}
            </p>
          </div>

          {/* Dot Indicators - Larger touch targets on mobile */}
          <div className="flex justify-center gap-3 sm:gap-2 mb-4 sm:mb-6 flex-shrink-0">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPhoto(i)}
                className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                  i === index
                    ? 'bg-gradient-to-r from-blue-400 to-pink-400 scale-125 shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Enhanced Navigation Buttons - Mobile optimized */}
          <div className="flex gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={prevPhoto}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation"
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-base sm:text-lg">◀</span>
                <span className="hidden sm:inline">Previous</span>
              </span>
            </button>
            <button
              onClick={nextPhoto}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:from-pink-500 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation"
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">Next</span>
                <span className="text-base sm:text-lg">▶</span>
              </span>
            </button>
          </div>
        </div>

        {/* Footer - Mobile friendly */}
        <div className="mt-4 sm:mt-8 text-center text-white/60 text-xs sm:text-sm px-4 flex-shrink-0">
          <p>💕 Made with love for our special moments 💕</p>
        </div>
      </div>
    </div>
  );
}
