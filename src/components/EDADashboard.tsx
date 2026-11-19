import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell
} from 'recharts';
import {
  classDistribution, suspiciousByTimeOfDay, suspiciousByCountry,
  correlationMatrix, securityInsights, featureDistributions
} from '../data/projectData';
import { AlertTriangle, ShieldCheck, Eye, TrendingUp } from 'lucide-react';

const COLORS = {
  normal: '#10b981',
  suspicious: '#ef4444',
  accent: '#06b6d4',
};

export default function EDADashboard() {
  const [activeInsight, setActiveInsight] = useState(0);

  // Prepare histogram data for feature distributions
  const histogramData = Object.entries(featureDistributions).map(([key, val]) => ({
    feature: key,
    normal: val.normal,
    suspicious: val.suspicious,
  }));

  // Prepare correlation data for heatmap cells
  const heatmapCells = correlationMatrix.data.flatMap((row, i) =>
    row.map((val, j) => ({
      row: correlationMatrix.features[i],
      col: correlationMatrix.features[j],
      value: val,
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Exploratory Data Analysis
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive analysis of the synthetic login-attempt dataset revealing patterns
          in suspicious behavior, temporal anomalies, and geographic threat distribution.
        </p>
      </div>

      {/* Dataset Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Records', value: '10,000' },
          { label: 'Features', value: '11' },
          { label: 'Missing Values', value: '3.8%' },
          { label: 'Class Imbalance', value: '85/15' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-lg bg-cyber-card border border-cyber-border text-center">
            <div className="text-xl font-bold text-white">{item.value}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Plot 1: Class Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Class Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Normal vs Suspicious login attempts</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Normal', value: classDistribution.normal, fill: COLORS.normal },
              { name: 'Suspicious', value: classDistribution.suspicious, fill: COLORS.suspicious },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                <Cell fill={COLORS.normal} />
                <Cell fill={COLORS.suspicious} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-400">Normal: {classDistribution.normal.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-400">Suspicious: {classDistribution.suspicious.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Plot 2: Feature Distributions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Feature Distributions by Class</h3>
          <p className="text-xs text-gray-500 mb-4">Key attack-related features split by class</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="feature" stroke="#64748b" fontSize={9} tickFormatter={(v) => v.replace('_', '\n')} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="normal" fill={COLORS.normal} radius={[2, 2, 0, 0]} />
              <Bar dataKey="suspicious" fill={COLORS.suspicious} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Plot 3 & 4: Temporal & Geographic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Plot 3: Suspicious Activity by Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Activity by Time of Day</h3>
          <p className="text-xs text-gray-500 mb-4">Suspicious activity peaks at night (02:00-04:00)</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={suspiciousByTimeOfDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="normal" stroke={COLORS.normal} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="suspicious" stroke={COLORS.suspicious} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Plot 4: Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Suspicious Activity by Country</h3>
          <p className="text-xs text-gray-500 mb-4">Certain countries show disproportionate threat rates</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={suspiciousByCountry} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis type="category" dataKey="country" stroke="#64748b" fontSize={12} width={40} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="normal" fill={COLORS.normal} radius={[0, 2, 2, 0]} />
              <Bar dataKey="suspicious" fill={COLORS.suspicious} radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Plot 5: Correlation Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-2">Correlation Heatmap</h3>
        <p className="text-xs text-gray-500 mb-4">Feature correlations with suspicious activity label</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="p-2 text-left text-gray-500"></th>
                {correlationMatrix.features.map((f) => (
                  <th key={f} className="p-2 text-center text-gray-500 font-normal whitespace-nowrap">
                    {f.replace('_', ' ').slice(0, 8)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.data.map((row, i) => (
                <tr key={i}>
                  <td className="p-2 text-gray-400 whitespace-nowrap font-medium">
                    {correlationMatrix.features[i].replace('_', ' ').slice(0, 12)}
                  </td>
                  {row.map((val, j) => {
                    const intensity = Math.abs(val);
                    const color = val > 0
                      ? `rgba(6, 182, 212, ${intensity})`
                      : `rgba(239, 68, 68, ${intensity})`;
                    return (
                      <td
                        key={j}
                        className="p-2 text-center font-mono"
                        style={{ background: color }}
                      >
                        <span className={intensity > 0.5 ? 'text-white font-bold' : 'text-gray-300'}>
                          {val.toFixed(2)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/50" />
            <span className="text-xs text-gray-500">Negative correlation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cyan-500/50" />
            <span className="text-xs text-gray-500">Positive correlation</span>
          </div>
        </div>
      </motion.div>

      {/* Security Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Eye className="w-6 h-6 text-cyan-500" />
          Security Insights from EDA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityInsights.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => setActiveInsight(i)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                activeInsight === i
                  ? 'bg-cyber-card border-cyan-500/40 glow-cyan'
                  : 'bg-cyber-card border-cyber-border hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  insight.severity === 'high' ? 'bg-red-500/10' : 'bg-yellow-500/10'
                }`}>
                  {insight.severity === 'high'
                    ? <AlertTriangle className="w-4 h-4 text-red-400" />
                    : <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  }
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  insight.severity === 'high'
                    ? 'bg-red-500/10 text-red-400'
                    : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {insight.severity}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">{insight.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Missing Value Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-xl bg-cyber-card border border-cyber-border p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-500" />
          Missing Value Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { col: 'session_duration_sec', pct: '4.2%', count: 420 },
            { col: 'ip_reputation_score', pct: '3.8%', count: 380 },
            { col: 'bytes_sent', pct: '2.1%', count: 210 },
            { col: 'device_type', pct: '1.5%', count: 150 },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-cyber-darker border border-cyber-border">
              <code className="text-xs text-gray-400 block mb-1">{item.col}</code>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-yellow-400">{item.pct}</span>
                <span className="text-xs text-gray-600">({item.count} rows)</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          → Strategy: Median imputation for numeric columns, most-frequent for categorical.
          Applied via SimpleImputer within Pipeline to prevent data leakage.
        </p>
      </motion.div>
    </div>
  );
}
