import React from 'react'
import PhotoCarousel from './components/PhotoCarousel'

const App = () => {
  const photos = [
    {
      src: "/img/bicepPic.JPG",
      title: "My bicep biter",
      description: "Se ve hermosa a mi lado"
    },
    {
      src: "/img/hands.JPG", 
      title: "Nuestras manos entrelazadas",
      description: "Tomados de la mano con Dianne"
    },
    {
      src: "/img/hug.jpg",
      title: "Abrazo Cálido", 
      description: "Un abrazo cálido para recordar"
    },
    {
      src: "/img/view.jpg",
      title: "Nuestra primera cita, y llueve",
      description: "Creo que lloviera lo hizo más bonito"
    },
    {
      src: "/img/kiss.jpg",
      title: "crazy for those kisses",
      description: "This one is english bc im too shy to say in spanish that im crazy for those kisses and the way you look at me"
    },
    {
      src: "/img/ugh.jpg",
      title: "La foto que menos me gusta",
      description: "Cuando me pasaste rogando dias por una foto tirando un beso para que tomes una foto cuando me queria reir y saliera tirando un beso (T-T)"
    }
  ]

  // Heart Icon Component
  const HeartIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  )

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 relative overflow-hidden">
      {/* Vintage Paper Texture Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #d4af37 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #d4af37 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Scattered Background Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-100 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1})`
            }}
          >
            <HeartIcon className="w-8 h-8" />
          </div>
        ))}
      </div>

      {/* Main Polaroid Header */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
        {/* Title Polaroid */}
        <div className="bg-white p-6 pb-16 rounded-lg shadow-2xl border border-gray-200 transform -rotate-2 hover:rotate-0 transition-transform duration-500 mb-8 max-w-sm mx-auto">
          {/* Vintage tape on corners */}
          <div className="absolute -top-3 left-8 w-12 h-6 bg-yellow-100 opacity-80 rounded border border-yellow-200 transform -rotate-12"></div>
          <div className="absolute -top-3 right-8 w-10 h-6 bg-yellow-100 opacity-80 rounded border border-yellow-200 transform rotate-6"></div>
          
          {/* Decorative vintage border */}
          <div className="relative bg-gradient-to-b from-amber-50 to-amber-100 p-6 rounded border-2 border-amber-200">
            <div className="text-center space-y-4">
              {/* Main Title */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <HeartIcon className="w-8 h-8 text-red-500" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800" style={{fontFamily: 'cursive'}}>
                  Primera Cita con Dianne 
                </h1>
                <HeartIcon className="w-8 h-8 text-red-500" />
              </div>
              
              {/* Date */}
              <div className="bg-white/80 rounded-lg p-3 border border-amber-300">
                <p className="text-amber-900 font-semibold text-lg" style={{fontFamily: 'cursive'}}>
                  Sábado 13 de Septiembre, 2025
                </p>
              </div>
              
              {/* Romantic Quote */}
              <p className="text-pink-600 italic text-sm font-medium mt-4">
                "Esas horas horas se sintieron como minutos"
              </p>
            </div>
          </div>
          
          {/* Handwritten style caption at bottom */}
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm" style={{fontFamily: 'cursive'}}>
              Nuestro Día Especial ✨
            </p>
          </div>
        </div>

        {/* Subtitle Instruction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 border border-pink-200 transform rotate-1">
          <p className="text-pink-600 text-sm font-medium flex items-center gap-2">
            <HeartIcon className="w-4 h-4" />
            Toca cualquier recuerdo para revivirlo
            <HeartIcon className="w-4 h-4" />
          </p>
        </div>
      </div>

      {/* Photo Carousel with integrated design */}
      <div className="relative">
        <PhotoCarousel photos={photos} />
      </div>

      {/* Vintage Paper Edge Effect at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-100/30 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default App
