import { motion } from 'framer-motion';
import {
  Shield, AlertTriangle, TrendingUp, Lock,
  ArrowRight, Activity, Database, Brain
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const stats = [
    { label: 'Dataset Records', value: '10,000', icon: Database },
    { label: 'Features', value: '11', icon: Activity },
    { label: 'ML Models', value: '3', icon: Brain },
    { label: 'Best AUC', value: '0.951', icon: TrendingUp },
  ];

  const quickLinks = [
    { id: 'pipeline', label: 'View Pipeline', description: 'End-to-end ML workflow', icon: '🔄' },
    { id: 'eda', label: 'EDA Results', description: 'Threat pattern analysis', icon: '📊' },
    { id: 'ml', label: 'Model Comparison', description: 'ML vs DL performance', icon: '🤖' },
    { id: 'ethics', label: 'Ethics Analysis', description: 'Fairness & bias audit', icon: '⚖️' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>ENSP355 — AI in Cyber Security Lab</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">AI-Driven </span>
            <span className="gradient-text">Cyber Threat</span>
            <br />
            <span className="text-white">Awareness & Detection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            An end-to-end machine learning pipeline for detecting suspicious login attempts.
            From exploratory data analysis through ethical AI considerations — demonstrating
            how AI can strengthen cybersecurity defenses while maintaining fairness.
          </motion.p>

          {/* Live Threat Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-cyber-card border border-cyber-border"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">Pipeline Status: Complete</span>
            </div>
            <div className="w-px h-6 bg-cyber-border" />
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-400">1,477 threats detected</span>
            </div>
            <div className="w-px h-6 bg-cyber-border" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-gray-400">92.8% detection accuracy</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative p-6 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyan-500/30 transition-all group"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-5 h-5 text-cyan-500 mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Quick Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {quickLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="group p-6 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyan-500/40 transition-all text-left"
            >
              <div className="text-3xl mb-3">{link.icon}</div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                {link.label}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{link.description}</p>
              <div className="flex items-center gap-1 text-cyan-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 text-center">System Architecture</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Data Generation', 'EDA & Insights', 'Preprocessing', 'ML Classification', 'Neural Network', 'Ethics Audit'].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-sm text-gray-300 font-medium">
                  {step}
                </div>
                {i < 5 && <ArrowRight className="w-4 h-4 text-gray-600 hidden sm:block" />}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400">→ PDF Technical Report Generated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
