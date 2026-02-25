import { useState } from 'react';
import { orgContent } from '../data/orgContent';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Interactive3DCards from './Interactive3DCards';

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  const selectedService = orgContent.services[selectedIndex];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-bw-surface overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-12 transition-all duration-700 ${headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our Programmes
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Click on a card below to explore our programmes and discover how we're creating impact.
          </p>
        </div>

        {/* 3D Interactive Cards */}
        <div
          ref={cardsRef}
          className={`mb-8 transition-all duration-700 ${cardsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <Interactive3DCards
            services={orgContent.services}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>

        {/* Selected Service Detail */}
        {selectedService && (
          <div className="mb-16 p-8 rounded-3xl border border-white/15 bg-black text-center max-w-2xl mx-auto transition-all duration-500">
            <span className="text-5xl mb-4 block grayscale">{selectedService.icon}</span>
            <h3 className="text-2xl font-black text-white mb-3">{selectedService.title}</h3>
            <p className="text-white/60 leading-relaxed">{selectedService.description}</p>
          </div>
        )}

        {/* Service Grid */}
        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {orgContent.services.map((service, i) => (
            <button
              key={service.id}
              onClick={() => setSelectedIndex(i)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group ${
                selectedIndex === i
                  ? 'border-white/40 bg-white/10'
                  : 'border-white/8 bg-black hover:border-white/20'
              }`}
            >
              <span className="text-3xl mb-4 block grayscale">{service.icon}</span>
              <h3 className={`text-lg font-bold mb-2 transition-colors ${selectedIndex === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {service.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
