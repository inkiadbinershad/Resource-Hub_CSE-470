import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ResourceDetails from './pages/ResourceDetails';
import BookingHistoryPage from './pages/BookingHistoryPage';
import VisualEffects from './components/VisualEffects';
import gsap from 'gsap';

const AnimatedRoute = ({ children }) => {
  const location = useLocation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Page enter animation
    gsap.fromTo(wrapperRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, [location.pathname]);

  return (
    <div ref={wrapperRef} key={location.pathname}>
      {children}
    </div>
  );
};

function App() {
  return (
    <VisualEffects
      // Aurora Background Configuration
      enableAurora={true}
      auroraColorStops={["#8c7ff0", "#B19EEF", "#5227FF"]}
      auroraBlend={0.75}
      auroraAmplitude={1.0}
      auroraSpeed={1.6}
      
      // ClickSpark Configuration
      sparkColor='#06b6d4'
      sparkSize={15}
      sparkRadius={35}
      sparkCount={12}
      duration={1000}
      enableClickSpark={true}
      enableAutoWrap={true}
    >
      <div className="min-h-screen" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            } />
            <Route path="/resources" element={
              <AnimatedRoute>
                <Resources />
              </AnimatedRoute>
            } />
            <Route path="/resource/:id" element={
              <AnimatedRoute>
                <ResourceDetails />
              </AnimatedRoute>
            } />
            <Route path="/history" element={
              <AnimatedRoute>
                <BookingHistoryPage />
              </AnimatedRoute>
            } />
          </Routes>
        </AnimatePresence>
        
        {/* Footer */}
        <footer className="bg-background-secondary/30 border-t border-slate-800 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-slate-400 text-sm">© 2024 ResourceHub. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </VisualEffects>
  );
}

export default App;

