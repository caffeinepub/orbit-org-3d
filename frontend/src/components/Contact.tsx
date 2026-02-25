import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SiLinkedin, SiInstagram, SiFacebook, SiX } from 'react-icons/si';
import { orgContent } from '../data/orgContent';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ContactDecoration() {
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.5;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x = -t * 0.2;
      icosaRef.current.rotation.z = t * 0.4;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.15;
      ringRef1.current.rotation.z = t * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.25;
      ringRef2.current.rotation.x = Math.PI / 4 + t * 0.1;
    }
  });

  return (
    <>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1.0}>
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1.0, 0.3, 64, 8]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={icosaRef} position={[0, 0, -1]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial color="#aaaaaa" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      <mesh ref={ringRef1} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 80]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringRef2} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.025, 16, 80]} />
        <meshStandardMaterial color="#888888" emissive="#888888" emissiveIntensity={0.2} transparent opacity={0.25} />
      </mesh>
    </>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-bw-surface overflow-hidden">
      {/* 3D Decoration */}
      <div className="absolute right-0 top-0 w-[450px] h-full pointer-events-none opacity-70">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-5, -5, 5]} intensity={0.8} color="#aaaaaa" />
          <ContactDecoration />
        </Canvas>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Ready to make a difference? Reach out to us and let's explore how we can collaborate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white/40 text-sm mb-1">Email</div>
                  <a href={`mailto:${orgContent.contact.email}`} className="text-white font-medium hover:text-white/70 transition-colors">
                    {orgContent.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white/40 text-sm mb-1">Phone</div>
                  <a href={`tel:${orgContent.contact.phone}`} className="text-white font-medium hover:text-white/70 transition-colors">
                    {orgContent.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white/40 text-sm mb-1">Address</div>
                  <p className="text-white font-medium">{orgContent.contact.address}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-white/40 text-sm mb-4">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { icon: SiX, href: orgContent.contact.social.twitter, label: 'X' },
                  { icon: SiLinkedin, href: orgContent.contact.social.linkedin, label: 'LinkedIn' },
                  { icon: SiInstagram, href: orgContent.contact.social.instagram, label: 'Instagram' },
                  { icon: SiFacebook, href: orgContent.contact.social.facebook, label: 'Facebook' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-white/10 bg-black">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/40 text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-sm mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can work together..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 hover:shadow-glow-white"
                >
                  {submitted ? (
                    <>✓ Message Sent!</>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
