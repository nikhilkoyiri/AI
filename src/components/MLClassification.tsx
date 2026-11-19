import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { mlResults, featureImportance, rocCurveData } from '../data/projectData';
import { Brain, Target, AlertCircle, Code } from 'lucide-react';

export default function MLClassification() {
  const [selectedModel, setSelectedModel] = useState<'logisticRegression' | 'decisionTree'>('logisticRegression');

  const model = mlResults[selectedModel];
  const rocData = rocCurveData[selectedModel];

  // Radar chart data
  const radarData = [
    { metric: 'Accuracy', LR: mlResults.logisticRegression.accuracy, DT: mlResults.decisionTree.accuracy },
    { metric: 'Precision', LR: mlResults.logisticRegression.precision, DT: mlResults.decisionTree.precision },
    { metric: 'Recall', LR: mlResults.logisticRegression.recall, DT: mlResults.decisionTree.recall },
    { metric: 'F1-Score', LR: mlResults.logisticRegression.f1, DT: mlResults.decisionTree.f1 },
    { metric: 'AUC', LR: mlResults.logisticRegression.auc, DT: mlResults.decisionTree.auc },
  ];

  const confusionData = [
    { label: 'TN', value: model.confusionMatrix[0][0], color: '#10b981' },
    { label: 'FP', value: model.confusionMatrix[0][1], color: '#ef4444' },
    { label: 'FN', value: model.confusionMatrix[1][0], color: '#f59e0b' },
    { label: 'TP', value: model.confusionMatrix[1][1], color: '#06b6d4' },
  ];

  const preprocessingCode = `# Preprocessing Pipeline (prevents data leakage)
numeric_features = ['login_attempts_per_hour', 'failed_login_ratio',
    'session_duration_sec', 'bytes_sent', 'bytes_received',
    'ip_reputation_score', 'time_of_day']
categorical_features = ['country', 'device_type', 'user_group', 'is_new_device']

numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ML Classification
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Logistic Regression and Decision Tree classifiers with proper preprocessing pipeline.
          Stratified 80/20 train-test split with comprehensive evaluation metrics.
        </p>
      </div>

      {/* Preprocessing Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-cyber-card border border-cyber-border overflow-hidden mb-8"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-cyber-border bg-cyber-darker/50">
          <Code className="w-4 h-4 text-cyan-500" />
          <span className="text-sm font-medium text-gray-300">Preprocessing Pipeline (src/02_ml_classification.py)</span>
        </div>
        <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
          <code>{preprocessingCode}</code>
        </pre>
      </motion.div>

      {/* Model Selector */}
      <div className="flex gap-3 mb-8 justify-center">
        <button
          onClick={() => setSelectedModel('logisticRegression')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            selectedModel === 'logisticRegression'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              : 'bg-cyber-card text-gray-400 border border-cyber-border hover:border-gray-600'
          }`}
        >
          Logistic Regression
        </button>
        <button
          onClick={() => setSelectedModel('decisionTree')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            selectedModel === 'decisionTree'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
              : 'bg-cyber-card text-gray-400 border border-cyber-border hover:border-gray-600'
          }`}
        >
          Decision Tree
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Accuracy', value: model.accuracy, format: 'pct' },
          { label: 'Precision', value: model.precision, format: 'pct' },
          { label: 'Recall', value: model.recall, format: 'pct' },
          { label: 'F1-Score', value: model.f1, format: 'pct' },
          { label: 'AUC', value: model.auc, format: 'pct' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-cyber-card border border-cyber-border text-center"
          >
            <div className="text-2xl font-bold text-white">
              {(metric.value * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Confusion Matrix */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Confusion Matrix</h3>
          <p className="text-xs text-gray-500 mb-4">
            {selectedModel === 'logisticRegression' ? 'Logistic Regression' : 'Decision Tree'} predictions
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {confusionData.map((cell) => (
              <div
                key={cell.label}
                className="p-4 rounded-lg text-center border"
                style={{ borderColor: cell.color + '40', background: cell.color + '10' }}
              >
                <div className="text-xs font-medium mb-1" style={{ color: cell.color }}>
                  {cell.label}
                </div>
                <div className="text-xl font-bold text-white">{cell.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              FP: {model.confusionMatrix[0][1]} | FN: {model.confusionMatrix[1][0]}
            </p>
          </div>
        </motion.div>

        {/* ROC Curve */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 20 }}
          className="rounded-xl bg-cyber-card border border-cyber-border p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-2">ROC Curve</h3>
          <p className="text-xs text-gray-500 mb-4">
            AUC = {model.auc.toFixed(3)}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="fpr" stroke="#64748b" fontSize={11} label={{ value: 'FPR', position: 'bottom', fill: '#64748b', fontSize: 11 }} />
              <YAxis stroke="#64748b" fontSize={11} label={{ value: 'TPR', angle: -90, position: 'left', fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="tpr"
                stroke={selectedModel === 'logisticRegression' ? '#06b6d4' : '#8b5cf6'}
                strokeWidth={2}
                dot={false}
              />
              {/* Diagonal reference */}
              <Line type="monotone" dataKey="fpr" stroke="#374151" strokeWidth={1} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Feature Importance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-500" />
          Feature Importance (Logistic Regression Coefficients)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Absolute coefficient magnitudes indicating predictive power
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" stroke="#64748b" fontSize={12} />
            <YAxis type="category" dataKey="feature" stroke="#64748b" fontSize={11} width={150} />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="importance" fill="#06b6d4" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Model Comparison Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-white mb-2">Model Comparison Radar</h3>
        <p className="text-xs text-gray-500 mb-4">Side-by-side performance across all metrics</p>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="metric" stroke="#64748b" fontSize={12} />
              <PolarRadiusAxis stroke="#1e293b" fontSize={10} />
              <Radar name="Logistic Regression" dataKey="LR" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
              <Radar name="Decision Tree" dataKey="DT" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Important Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-yellow-500/5 border border-yellow-500/20 p-6"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">
              Why Accuracy Alone is Misleading
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              With 85% normal and 15% suspicious classes, a naive classifier predicting "normal" for every
              instance would achieve 85% accuracy while detecting zero threats. This is why we prioritize
              <strong className="text-white"> Precision, Recall, F1-score, and AUC</strong> — especially Recall,
              which measures our ability to catch actual threats. In cybersecurity, missing a real attack
              (false negative) is often more costly than a false alarm (false positive).
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
