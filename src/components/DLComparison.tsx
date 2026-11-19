import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line
} from 'recharts';
import { modelComparison, mlpResults } from '../data/projectData';
import { Cpu, Clock, Zap, Brain, Info } from 'lucide-react';

export default function DLComparison() {
  // Training time comparison data
  const timeData = modelComparison.map(m => ({
    model: m.model.replace('MLP Neural Network', 'MLP'),
    training: m.trainTime,
    inference: m.inferenceTime * 1000, // Convert to ms
  }));

  // Metric comparison for bar chart
  const metricComparison = [
    { metric: 'Accuracy', ...Object.fromEntries(modelComparison.map(m => [m.model.replace('MLP Neural Network', 'MLP'), m.accuracy])) },
    { metric: 'Precision', ...Object.fromEntries(modelComparison.map(m => [m.model.replace('MLP Neural Network', 'MLP'), m.precision])) },
    { metric: 'Recall', ...Object.fromEntries(modelComparison.map(m => [m.model.replace('MLP Neural Network', 'MLP'), m.recall])) },
    { metric: 'F1-Score', ...Object.fromEntries(modelComparison.map(m => [m.model.replace('MLP Neural Network', 'MLP'), m.f1])) },
    { metric: 'AUC', ...Object.fromEntries(modelComparison.map(m => [m.model.replace('MLP Neural Network', 'MLP'), m.auc])) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Neural Network Comparison
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          MLPClassifier (64, 32) architecture trained on the same preprocessed data.
          Comparing deep learning vs traditional ML for cyber threat detection.
        </p>
      </div>

      {/* MLP Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-500" />
          MLP Architecture
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <div className="px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-center">
            <div className="text-xs text-gray-500 mb-1">Input Layer</div>
            <div className="text-sm font-bold text-cyan-400">~25 neurons</div>
            <div className="text-xs text-gray-600">(after one-hot)</div>
          </div>
          <div className="text-gray-600">→</div>
          <div className="px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-center">
            <div className="text-xs text-gray-500 mb-1">Hidden Layer 1</div>
            <div className="text-sm font-bold text-purple-400">64 neurons</div>
            <div className="text-xs text-gray-600">ReLU activation</div>
          </div>
          <div className="text-gray-600">→</div>
          <div className="px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-center">
            <div className="text-xs text-gray-500 mb-1">Hidden Layer 2</div>
            <div className="text-sm font-bold text-purple-400">32 neurons</div>
            <div className="text-xs text-gray-600">ReLU activation</div>
          </div>
          <div className="text-gray-600">→</div>
          <div className="px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
            <div className="text-xs text-gray-500 mb-1">Output Layer</div>
            <div className="text-sm font-bold text-green-400">1 neuron</div>
            <div className="text-xs text-gray-600">Sigmoid</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Early Stopping', value: 'Enabled' },
            { label: 'Max Iterations', value: '300' },
            { label: 'Random State', value: '42' },
            { label: 'Converged at', value: `Epoch ${mlpResults.lossCurve.length * 5}` },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-cyber-darker border border-cyber-border text-center">
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="text-sm font-bold text-white mt-1">{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* MLP Loss Curve */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-2">Training & Validation Loss</h3>
        <p className="text-xs text-gray-500 mb-4">
          MLP loss curve showing convergence with early stopping
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={mlpResults.lossCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="epoch" stroke="#64748b" fontSize={12} label={{ value: 'Epoch', position: 'bottom', fill: '#64748b', fontSize: 12 }} />
            <YAxis stroke="#64748b" fontSize={12} label={{ value: 'Loss', angle: -90, position: 'left', fill: '#64748b', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="trainLoss" name="Training Loss" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="valLoss" name="Validation Loss" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Note: Validation loss plateaus around epoch 50, confirming early stopping is effective.
          No significant overfitting gap between train and validation loss.
        </p>
      </motion.div>

      {/* Model Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Complete Comparison Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="p-3 text-left text-gray-400 font-medium">Metric</th>
                {modelComparison.map((m) => (
                  <th key={m.model} className="p-3 text-center text-gray-400 font-medium">
                    {m.model.replace('MLP Neural Network', 'MLP (64,32)')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Accuracy', key: 'accuracy' as const, format: (v: number) => `${(v * 100).toFixed(1)}%` },
                { label: 'Precision', key: 'precision' as const, format: (v: number) => `${(v * 100).toFixed(1)}%` },
                { label: 'Recall', key: 'recall' as const, format: (v: number) => `${(v * 100).toFixed(1)}%` },
                { label: 'F1-Score', key: 'f1' as const, format: (v: number) => `${(v * 100).toFixed(1)}%` },
                { label: 'AUC', key: 'auc' as const, format: (v: number) => v.toFixed(3) },
                { label: 'Training Time', key: 'trainTime' as const, format: (v: number) => `${v.toFixed(3)}s` },
                { label: 'Inference Time', key: 'inferenceTime' as const, format: (v: number) => `${(v * 1000).toFixed(1)}ms` },
              ].map((row) => (
                <tr key={row.label} className="border-b border-cyber-border/50">
                  <td className="p-3 text-gray-300 font-medium">{row.label}</td>
                  {modelComparison.map((m) => {
                    const val = m[row.key];
                    const isBest = row.key === 'trainTime' || row.key === 'inferenceTime'
                      ? val === Math.min(...modelComparison.map(x => x[row.key]))
                      : val === Math.max(...modelComparison.map(x => x[row.key]));
                    return (
                      <td key={m.model} className="p-3 text-center">
                        <span className={isBest ? 'text-cyan-400 font-bold' : 'text-gray-400'}>
                          {row.format(val)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Metric Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-2">Performance Metrics Comparison</h3>
        <p className="text-xs text-gray-500 mb-4">All models evaluated on the same test set</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metricComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="metric" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} domain={[0.6, 1.0]} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="Logistic Regression" fill="#06b6d4" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Decision Tree" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="MLP" fill="#10b981" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Training Time Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Training Time
          </h3>
          <p className="text-xs text-gray-500 mb-4">Seconds to train each model</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="model" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="training" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-cyber-card border border-cyber-border p-6">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-500" />
            Inference Time
          </h3>
          <p className="text-xs text-gray-500 mb-4">Milliseconds per prediction</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="model" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="inference" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Feasibility Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Practical Feasibility Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">📊 Data Requirements</h4>
              <p className="text-xs text-gray-400">
                Neural networks need significantly more data to generalize well. With only 10K records,
                the MLP's advantage is modest. For production systems with millions of events, DL would shine.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">💻 Compute Cost</h4>
              <p className="text-xs text-gray-400">
                MLP takes ~67x longer to train (2.85s vs 0.04s). For real-time threat detection,
                inference time matters more — all models are fast enough (&lt;3ms per prediction).
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border">
              <h4 className="text-sm font-semibold text-green-400 mb-2">🔍 Interpretability</h4>
              <p className="text-xs text-gray-400">
                Logistic Regression provides clear feature coefficients — analysts can understand why
                a login was flagged. MLP is a black box, making it harder to explain decisions to stakeholders
                or comply with "right to explanation" regulations.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-cyber-darker border border-cyber-border">
              <h4 className="text-sm font-semibold text-yellow-400 mb-2">🚀 Deployment</h4>
              <p className="text-xs text-gray-400">
                Logistic Regression is simplest to deploy (just coefficients + scaler). MLP requires
                the full sklearn pipeline. For edge deployment or low-resource environments,
                traditional ML is more practical.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-cyan-400 mb-1">Recommendation</h4>
              <p className="text-xs text-gray-400">
                For this dataset size, <strong className="text-white">Logistic Regression is the best practical choice</strong> — 
                it achieves competitive AUC (0.934), trains 67x faster, and provides full interpretability.
                The MLP's marginal improvement (AUC 0.951) doesn't justify the loss of explainability
                in a security context where analysts need to understand alerts.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
