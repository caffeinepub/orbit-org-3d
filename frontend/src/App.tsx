import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import About from './components/About';
import MissionVision from './components/MissionVision';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bw-hero text-white">
      <Navbar />
      <main>
        <Hero3D />
        <About />
        <MissionVision />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
