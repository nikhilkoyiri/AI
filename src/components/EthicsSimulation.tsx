import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar
} from 'recharts';
import { thresholdAnalysis, biasSimulation } from '../data/projectData';
import { Scale, AlertTriangle, Shield, Eye, Users, FileText, Lock } from 'lucide-react';

export default function EthicsSimulation() {
  const [selectedThreshold, setSelectedThreshold] = useState(0.5);
  const [showMitigation, setShowMitigation] = useState(false);

  const currentThreshold = thresholdAnalysis.find(t => t.threshold === selectedThreshold) || thresholdAnalysis[2];

  const biasData = showMitigation ? biasSimulation.afterMitigation : biasSimulation.beforeMitigation;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ethics & Fairness Simulation
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Exploring the ethical implications of AI-driven threat detection: threshold tuning,
          false positive impact, algorithmic bias, and mitigation strategies.
        </p>
      </div>

      {/* Section 1: Threshold Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Scale className="w-6 h-6 text-cyan-500" />
          Decision Threshold Impact Analysis
        </h2>

        {/* Threshold Selector */}
        <div className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Select Decision Threshold: <span className="text-cyan-400">{selectedThreshold.toFixed(1)}</span>
          </h3>
          <div className="flex gap-2 flex-wrap">
            {thresholdAnalysis.map((t) => (
              <button
                key={t.threshold}
                onClick={() => setSelectedThreshold(t.threshold)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedThreshold === t.threshold
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'bg-cyber-darker text-gray-400 border border-cyber-border hover:border-gray-600'
                }`}
              >
                {t.threshold.toFixed(1)}
              </button>
            ))}
          </div>

          {/* Impact Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border text-center">
              <div className="text-xs text-gray-500 mb-1">Precision</div>
              <div className="text-xl font-bold text-cyan-400">{(currentThreshold.precision * 100).toFixed(0)}%</div>
            </div>
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border text-center">
              <div className="text-xs text-gray-500 mb-1">Recall</div>
              <div className="text-xl font-bold text-green-400">{(currentThreshold.recall * 100).toFixed(0)}%</div>
            </div>
            <div className="p-4 rounded-lg bg-cyber-darker border border-red-500/20 text-center">
              <div className="text-xs text-gray-500 mb-1">False Positives / 10K logins</div>
              <div className="text-xl font-bold text-red-400">{currentThreshold.fpPer10k}</div>
            </div>
            <div className="p-4 rounded-lg bg-cyber-darker border border-yellow-500/20 text-center">
              <div className="text-xs text-gray-500 mb-1">False Negatives / 10K logins</div>
              <div className="text-xl font-bold text-yellow-400">{currentThreshold.fnPer10k}</div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-xs text-gray-400">
              <strong className="text-yellow-400">Impact at threshold {selectedThreshold.toFixed(1)}:</strong>{' '}
              {selectedThreshold <= 0.3
                ? `${currentThreshold.fpPer10k} legitimate users wrongly blocked per 10,000 logins. High customer frustration but catches most threats.`
                : selectedThreshold >= 0.7
                ? `Only ${currentThreshold.fpPer10k} false alarms, but ${currentThreshold.fnPer10k} actual threats go undetected per 10,000 logins.`
                : `Balanced approach: ${currentThreshold.fpPer10k} false blocks vs ${currentThreshold.fnPer10k} missed threats per 10,000 logins.`
              }
            </p>
          </div>
        </div>

        {/* Precision-Recall vs Threshold Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
            <h3 className="text-sm font-semibold text-white mb-2">Precision & Recall vs Threshold</h3>
            <p className="text-xs text-gray-500 mb-4">Classic trade-off: higher threshold → higher precision, lower recall</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={thresholdAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="threshold" stroke="#64748b" fontSize={12} label={{ value: 'Threshold', position: 'bottom', fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 1]} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="precision" name="Precision" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="recall" name="Recall" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
            <h3 className="text-sm font-semibold text-white mb-2">FP/FN Trade-off per 10K Logins</h3>
            <p className="text-xs text-gray-500 mb-4">Real-world impact: how many users affected</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={thresholdAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="threshold" stroke="#64748b" fontSize={12} label={{ value: 'Threshold', position: 'bottom', fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="fpPer10k" name="False Positives" fill="#ef4444" radius={[2, 2, 0, 0]} />
                <Bar dataKey="fnPer10k" name="False Negatives" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Bias Simulation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Users className="w-6 h-6 text-purple-500" />
          Algorithmic Bias Simulation
        </h2>

        <div className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">False Positive Rate by User Group</h3>
              <p className="text-xs text-gray-500">
                {showMitigation ? 'After mitigation (sensitive features removed + class_weight=balanced)' : 'Before mitigation (biased training data)'}
              </p>
            </div>
            <button
              onClick={() => setShowMitigation(!showMitigation)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                showMitigation
                  ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}
            >
              {showMitigation ? '✓ Mitigation Applied' : 'Apply Mitigation'}
            </button>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={biasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="group" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} domain={[0, 0.25]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="fpr" name="False Positive Rate" fill={showMitigation ? '#10b981' : '#ef4444'} radius={[4, 4, 0, 0]} />
              <Bar dataKey="fnr" name="False Negative Rate" fill={showMitigation ? '#06b6d4' : '#f59e0b'} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 rounded-lg bg-cyber-darker border border-cyber-border">
            <h4 className="text-sm font-semibold text-white mb-2">
              {showMitigation ? '✅ After Mitigation' : '⚠️ Bias Detected'}
            </h4>
            <p className="text-xs text-gray-400">
              {showMitigation
                ? 'After removing sensitive features (country, user_group) and applying class_weight="balanced", the FPR disparity dropped from 6.6x (21% vs 3.2%) to 1.9x (7.2% vs 3.8%). While not perfectly equal, this is a significant improvement in fairness.'
                : 'The biased training data causes Groups C and D to have 5-6x higher false positive rates. Legitimate users from these groups are disproportionately blocked — a clear case of algorithmic discrimination that could violate anti-discrimination laws.'
              }
            </p>
          </div>
        </div>

        {/* Bias Context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-cyber-card border border-cyber-border">
            <AlertTriangle className="w-5 h-5 text-red-500 mb-3" />
            <h4 className="text-sm font-semibold text-white mb-2">The Problem</h4>
            <p className="text-xs text-gray-400">
              When training data over-represents certain groups as "suspicious," the model learns
              geographic/demographic shortcuts instead of actual behavioral signals.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-cyber-card border border-cyber-border">
            <Shield className="w-5 h-5 text-cyan-500 mb-3" />
            <h4 className="text-sm font-semibold text-white mb-2">Mitigation Strategy</h4>
            <p className="text-xs text-gray-400">
              Remove sensitive features from training, use class_weight="balanced",
              and audit FPR across demographic groups regularly.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-cyber-card border border-cyber-border">
            <Eye className="w-5 h-5 text-green-500 mb-3" />
            <h4 className="text-sm font-semibold text-white mb-2">Monitoring</h4>
            <p className="text-xs text-gray-400">
              Implement continuous fairness monitoring with alerts when FPR disparity
              exceeds 2x between any two groups.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 3: Ethics Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-green-500" />
          Ethical Considerations & Recommendations
        </h2>

        <div className="space-y-4">
          {/* Privacy */}
          <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Privacy Concerns</h4>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-300">User Behavior Tracking:</strong> Monitoring login patterns, device usage, and session data raises privacy questions. Users should be informed about what data is collected.</li>
                  <li>• <strong className="text-gray-300">Data Retention:</strong> How long should behavioral data be stored? GDPR Article 5 requires data minimization — keep only what's necessary.</li>
                  <li>• <strong className="text-gray-300">GDPR/DPDP Act Compliance:</strong> Right to explanation (Article 22), right to erasure, data portability. Automated decisions with legal effects require human review.</li>
                  <li>• <strong className="text-gray-300">Cross-border Data:</strong> IP addresses and country data may constitute personal data under various jurisdictions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Explainability */}
          <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/10">
                <Eye className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Explainability Limitations</h4>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-300">Logistic Regression:</strong> Fully interpretable — each coefficient shows feature impact direction and magnitude. Security analysts can understand and validate decisions.</li>
                  <li>• <strong className="text-gray-300">MLP Neural Network:</strong> Black-box model. Even with SHAP/LIME, explanations are approximations. Harder to audit for compliance.</li>
                  <li>• <strong className="text-gray-300">Recommendation:</strong> Use LR as primary model for production (explainable), MLP for research/offline analysis. Implement SHAP values for any complex model.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Human-in-the-loop */}
          <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Human-in-the-Loop Recommendation</h4>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-300">Tiered Response:</strong> Low-confidence alerts (0.3-0.7) should trigger human review, not automatic blocking.</li>
                  <li>• <strong className="text-gray-300">Appeal Process:</strong> Users wrongly blocked must have a clear, fast path to restore access.</li>
                  <li>• <strong className="text-gray-300">Regular Audits:</strong> Monthly review of false positive rates across demographics. Quarterly model retraining with fresh data.</li>
                  <li>• <strong className="text-gray-300">NIST CSF Alignment:</strong> Map to Identify (ID), Protect (PR), Detect (DE), Respond (RS), Recover (RC) functions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* NIST Framework */}
          <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-6">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">NIST Cybersecurity Framework Alignment</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { fn: 'Identify', desc: 'Asset management, risk assessment of login patterns', color: 'cyan' },
                { fn: 'Protect', desc: 'Access control, MFA enforcement based on risk score', color: 'green' },
                { fn: 'Detect', desc: 'ML-based anomaly detection, continuous monitoring', color: 'yellow' },
                { fn: 'Respond', desc: 'Automated alerts, human review, incident logging', color: 'red' },
                { fn: 'Recover', desc: 'Account restoration, model updates, lessons learned', color: 'purple' },
              ].map((item) => (
                <div key={item.fn} className="p-3 rounded-lg bg-cyber-darker border border-cyber-border text-center">
                  <div className={`text-xs font-bold mb-1 ${
                    item.color === 'cyan' ? 'text-cyan-400' :
                    item.color === 'green' ? 'text-green-400' :
                    item.color === 'yellow' ? 'text-yellow-400' :
                    item.color === 'red' ? 'text-red-400' : 'text-purple-400'
                  }`}>{item.fn}</div>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
