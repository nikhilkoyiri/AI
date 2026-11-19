import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, BarChart3, Brain, Cpu, Scale, Code,
  Menu, X, ChevronRight, Github, FileText
} from 'lucide-react';
import HeroSection from './components/HeroSection';
import PipelineOverview from './components/PipelineOverview';
import EDADashboard from './components/EDADashboard';
import MLClassification from './components/MLClassification';
import DLComparison from './components/DLComparison';
import EthicsSimulation from './components/EthicsSimulation';

const navItems = [
  { id: 'hero', label: 'Overview', icon: Shield },
  { id: 'pipeline', label: 'Pipeline', icon: Code },
  { id: 'eda', label: 'EDA', icon: BarChart3 },
  { id: 'ml', label: 'ML Models', icon: Brain },
  { id: 'dl', label: 'Neural Net', icon: Cpu },
  { id: 'ethics', label: 'Ethics', icon: Scale },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return <HeroSection onNavigate={setActiveSection} />;
      case 'pipeline': return <PipelineOverview />;
      case 'eda': return <EDADashboard />;
      case 'ml': return <MLClassification />;
      case 'dl': return <DLComparison />;
      case 'ethics': return <EthicsSimulation />;
      default: return <HeroSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark grid-bg">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/90 backdrop-blur-md border-b border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-white">AI Cyber Threat Detection</h1>
                <p className="text-xs text-gray-500">ENSP355 Mini Project</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-2">
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all">
                <FileText className="w-4 h-4" />
                <span>Report</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-cyber-border bg-cyber-darker/95"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-border bg-cyber-darker/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan-500" />
              <span className="text-sm text-gray-500">AI-Driven Cyber Threat Detection Prototype</span>
            </div>
            <p className="text-xs text-gray-600">
              ENSP355 — AI in Cyber Security Lab | Mini Project Unit 1 | Random Seed: 42
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
