import { useState, useEffect } from 'react'

const PhotoCarousel = ({ photos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Icon Components
  const HeartIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  )

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  const SparkleIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  // Romantic quotes for each photo
  const romanticQuotes = [
    "Cada momento contigo fue tan especial, me gusto tanto pasar tiempo contigo (Aunque escucharas como me moria de hambre, esta es mi foto favorita de hecho) ",
    "Creo que bese tu mano más de 20 veces en menos de una hora", 
    "Haces que mi corazón se acelere (me tenias bien nervioso)",
    "La laguna se veía bonita, pero no tanto como tú",
    "Kissing you feels like a dream I never want to wake up from",
    "Mi niña linda, me das furia y ternura a la vez",
  ]

  // Generate positions for Polaroids - mobile optimized
  const getPolaroidStyle = (index) => {
    const rotations = [-8, 5, -3, 7, -5, 2, -7, 4, -6, 3, -4, 6]
    // Mobile-friendly distribution - better spacing
    const positions = [
      // Foto 0 - My bicep biter
      { top: '8%', left: '12%' },   
      // Foto 1 - Nuestras manos entrelazadas  
      { top: '23%', left: '55%' },  
      // Foto 2 - Abrazo Cálido
      { top: '38%', left: '8%' },   
      // Foto 3 - Nuestra primera cita
      { top: '53%', left: '50%' },  
      // Foto 4 - crazy for those kisses
      { top: '68%', left: '15%' },  
      // Foto 5 - La foto que menos me gusta
      { top: '83%', left: '45%' },  
      
      // Extra positions for more photos
      { top: '15%', left: '75%' },
      { top: '30%', left: '25%' },
      { top: '45%', left: '70%' },
      { top: '60%', left: '20%' },
      { top: '75%', left: '65%' },
      { top: '90%', left: '30%' }
    ]
    
    return {
      transform: `rotate(${rotations[index % rotations.length]}deg)`,
      position: 'absolute',
      ...positions[index % positions.length],
      zIndex: selectedPhoto === index ? 50 : 10 + index
    }
  }

  // Generate floating hearts
  const createFloatingHearts = () => {
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 3000)
  }

  // Handle Polaroid selection
  const handlePolaroidClick = (index) => {
    if (selectedPhoto === index) {
      setSelectedPhoto(null)
    } else {
      setSelectedPhoto(index)
      setCurrentIndex(index)
    }
  }

  // Navigation functions
  const goToNext = () => {
    if (isLoading) return
    setIsLoading(true)
    const nextIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(nextIndex)
    setSelectedPhoto(nextIndex)
    setTimeout(() => setIsLoading(false), 300)
  }

  const goToPrevious = () => {
    if (isLoading) return
    setIsLoading(true)
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(prevIndex)
    setSelectedPhoto(prevIndex)
    setTimeout(() => setIsLoading(false), 300)
  }

  // Touch/swipe handling for selected photo
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrevious()
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') setSelectedPhoto(null)
      if (e.key === ' ') {
        e.preventDefault()
        createFloatingHearts()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex])

  // Floating hearts component
  const FloatingHearts = () => {
    if (!showHearts) return null
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <HeartIcon className="w-6 h-6" />
          </div>
        ))}
      </div>
    )
  }

  if (!photos.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-red-100 p-4">
        <div className="text-center">
          <HeartIcon className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <p className="text-red-500 text-xl">Esperando tus recuerdos de amor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Floating Hearts */}
      <FloatingHearts />
      

      {/* Polaroid Gallery */}
      <div className="relative w-full min-h-screen p-2 pb-20" style={{height: 'calc(100vh + 400px)'}}>
        {/* Coffee Thread connecting photos */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 5}} viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main thread - solid line connecting all photos */}
          <path
            d="M 10 15 Q 25 20 45 25 Q 65 30 80 20 Q 85 35 70 45 Q 50 55 30 50 Q 15 65 40 70 Q 60 75 75 85 Q 80 90 85 95"
            stroke="#8B4513"
            strokeWidth="0.3"
            fill="none"
            opacity="0.8"
          />
          
          {/* Secondary connecting thread */}
          <path
            d="M 15 10 Q 35 25 55 15 Q 75 40 45 55 Q 25 70 50 80 Q 70 85 90 90"
            stroke="#A0522D"
            strokeWidth="0.2"
            fill="none"
            opacity="0.6"
          />
        </svg>

        {/* Background scattered hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-200 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              <HeartIcon className="w-6 h-6" />
            </div>
          ))}
        </div>

        {/* Polaroid Photos */}
        {photos.map((photo, index) => (
          <div
            key={index}
            style={getPolaroidStyle(index)}
            className={`cursor-pointer transition-all duration-500 ${
              selectedPhoto === index ? 'scale-110' : 'hover:scale-105'
            }`}
            onClick={() => handlePolaroidClick(index)}
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-3 pb-16 rounded-lg shadow-2xl border border-gray-200 transform transition-all duration-300 hover:shadow-3xl">
              <div className="relative">
                <img
                  src={photo.src}
                  alt={photo.title || `Memory ${index + 1}`}
                  className="w-36 h-28 sm:w-40 sm:h-32 object-cover rounded"
                  draggable={false}
                />
                
                {/* Coffee thread clip */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-800 opacity-80 rounded-full border-2 border-amber-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                </div>
                
                {/* Tape effect */}
                <div className="absolute -top-2 right-2 w-6 h-4 bg-yellow-100 opacity-70 rounded-sm border border-yellow-200 transform rotate-12"></div>
              </div>
              
              {/* Handwritten style caption */}
              <div className="mt-3 text-center">
                <p className="text-gray-700 text-sm font-handwriting" style={{fontFamily: 'cursive'}}>
                  {photo.title}
                </p>
              </div>
              
              {/* Small heart indicator if selected */}
              {selectedPhoto === index && (
                <div className="absolute -top-1 -right-1">
                  <HeartIcon className="w-5 h-5 text-red-500 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Instruction text */}
       
      </div>

      {/* Selected Photo Overlay */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all"
          >
            <CloseIcon />
          </button>

          {/* Large Polaroid Display */}
          <div className="bg-white p-6 pb-20 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300">
            <div className="relative">
              <img
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].title}
                className="w-full h-64 object-cover rounded-lg"
                draggable={false}
              />
              
              {/* Vintage tape */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-100 opacity-80 rounded border border-yellow-200"></div>
              <div className="absolute -top-3 right-8 w-8 h-6 bg-yellow-100 opacity-80 rounded border border-yellow-200 transform rotate-12"></div>
            </div>
            
            {/* Photo details */}
            <div className="mt-6 text-center space-y-3">
              <h3 className="text-xl font-bold text-gray-800" style={{fontFamily: 'cursive'}}>
                {photos[selectedPhoto].title}
              </h3>
              
              {photos[selectedPhoto].description && (
                <p className="text-gray-600">{photos[selectedPhoto].description}</p>
              )}
              
              <p className="text-pink-600 italic text-sm font-medium">
                {romanticQuotes[selectedPhoto % romanticQuotes.length]}
              </p>
              
              {/* Navigation dots */}
              <div className="flex justify-center gap-2 pt-4">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePolaroidClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedPhoto
                        ? 'bg-red-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl">
                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Navigation hints */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm text-center">
            <p>Desliza izquierda/derecha para navegar • Toca afuera para cerrar</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default PhotoCarousel