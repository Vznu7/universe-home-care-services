export function AboutHero() {
  return (
    <section className="relative bg-teal-900 text-white pt-20 pb-28">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551076805-e18690c5e45e?auto=format&fit=crop&q=80&w=1600&h=600" 
          alt="Healthcare professionals" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-teal-900/80 mix-blend-multiply"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Care That Feels Like Home</h1>
        <p className="text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
          We are dedicated to providing compassionate, professional home healthcare to support the well-being and dignity of your loved ones.
        </p>
      </div>
    </section>
  );
}

