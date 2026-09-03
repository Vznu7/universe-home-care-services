export function WhoWeAre() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Who We Are</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We are a home healthcare organization focused on helping families access dependable care in the comfort of their own homes. 
              </p>
              <p>
                Our approach combines compassionate support, trained professionals, and care plans designed around individual needs. We believe that healing and aging are best experienced in familiar surroundings, supported by family and skilled caregivers.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img 
              src="/who-we-are.jpg" 
              alt="Universe Home Care Services Team Meeting" 
              className="rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

