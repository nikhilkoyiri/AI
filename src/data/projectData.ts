// Realistic mock data representing what the Python ML pipeline produces
// Based on synthetic login-attempt dataset with ~85% normal, ~15% suspicious

// Task 2: EDA Data
export const classDistribution = { normal: 8523, suspicious: 1477 };

export const featureDistributions = {
  failedLoginRatio: {
    normal: [0.05, 0.08, 0.12, 0.15, 0.1, 0.07, 0.03, 0.02, 0.01, 0.01],
    suspicious: [0.15, 0.2, 0.25, 0.3, 0.2, 0.15, 0.1, 0.08, 0.05, 0.02],
  },
  bytesSent: {
    normal: [50, 120, 200, 180, 150, 100, 60, 30, 10, 5],
    suspicious: [10, 30, 80, 150, 200, 180, 120, 80, 50, 30],
  },
  loginAttemptsPerHour: {
    normal: [5, 20, 45, 60, 50, 35, 20, 10, 5, 2],
    suspicious: [2, 5, 10, 15, 25, 40, 55, 50, 30, 15],
  },
};

export const boxplotData = {
  failedLoginRatio: {
    normal: { min: 0, q1: 0.05, median: 0.1, q3: 0.18, max: 0.35 },
    suspicious: { min: 0.15, q1: 0.35, median: 0.55, q3: 0.72, max: 0.98 },
  },
  bytesSent: {
    normal: { min: 100, q1: 500, median: 1200, q3: 2500, max: 8000 },
    suspicious: { min: 50, q1: 3000, median: 8000, q3: 15000, max: 50000 },
  },
};

export const suspiciousByTimeOfDay = [
  { hour: '00:00', normal: 120, suspicious: 85 },
  { hour: '02:00', normal: 80, suspicious: 95 },
  { hour: '04:00', normal: 60, suspicious: 110 },
  { hour: '06:00', normal: 150, suspicious: 70 },
  { hour: '08:00', normal: 450, suspicious: 45 },
  { hour: '10:00', normal: 600, suspicious: 35 },
  { hour: '12:00', normal: 550, suspicious: 40 },
  { hour: '14:00', normal: 580, suspicious: 38 },
  { hour: '16:00', normal: 520, suspicious: 42 },
  { hour: '18:00', normal: 400, suspicious: 55 },
  { hour: '20:00', normal: 300, suspicious: 70 },
  { hour: '22:00', normal: 200, suspicious: 90 },
];

export const suspiciousByCountry = [
  { country: 'US', normal: 4200, suspicious: 320 },
  { country: 'UK', normal: 1500, suspicious: 180 },
  { country: 'CN', normal: 400, suspicious: 380 },
  { country: 'RU', normal: 200, suspicious: 290 },
  { country: 'DE', normal: 800, suspicious: 95 },
  { country: 'IN', normal: 600, suspicious: 120 },
  { country: 'BR', normal: 350, suspicious: 65 },
  { country: 'NG', normal: 150, suspicious: 180 },
];

export const correlationMatrix = {
  features: ['login_attempts', 'failed_ratio', 'session_dur', 'bytes_sent', 'bytes_recv', 'ip_rep', 'is_new_dev', 'is_suspicious'],
  data: [
    [1.0, 0.82, -0.15, 0.23, 0.18, -0.45, 0.38, 0.71],
    [0.82, 1.0, -0.28, 0.31, 0.22, -0.62, 0.41, 0.85],
    [-0.15, -0.28, 1.0, 0.12, 0.08, 0.15, -0.1, -0.22],
    [0.23, 0.31, 0.12, 1.0, 0.78, -0.35, 0.29, 0.42],
    [0.18, 0.22, 0.08, 0.78, 1.0, -0.28, 0.22, 0.35],
    [-0.45, -0.62, 0.15, -0.35, -0.28, 1.0, -0.52, -0.73],
    [0.38, 0.41, -0.1, 0.29, 0.22, -0.52, 1.0, 0.58],
    [0.71, 0.85, -0.22, 0.42, 0.35, -0.73, 0.58, 1.0],
  ],
};

// Task 3: ML Classification Results
export const mlResults = {
  logisticRegression: {
    accuracy: 0.912,
    precision: 0.785,
    recall: 0.723,
    f1: 0.753,
    auc: 0.934,
    trainingTime: 0.042,
    inferenceTime: 0.001,
    confusionMatrix: [[1680, 24], [41, 255]],
  },
  decisionTree: {
    accuracy: 0.889,
    precision: 0.712,
    recall: 0.798,
    f1: 0.752,
    auc: 0.876,
    trainingTime: 0.156,
    inferenceTime: 0.002,
    confusionMatrix: [[1645, 59], [28, 268]],
  },
};

export const featureImportance = [
  { feature: 'failed_login_ratio', importance: 0.32 },
  { feature: 'ip_reputation_score', importance: 0.24 },
  { feature: 'login_attempts_per_hour', importance: 0.18 },
  { feature: 'is_new_device', importance: 0.11 },
  { feature: 'bytes_sent', importance: 0.07 },
  { feature: 'session_duration_sec', importance: 0.04 },
  { feature: 'bytes_received', importance: 0.02 },
  { feature: 'time_of_day', importance: 0.02 },
];

export const rocCurveData = {
  logisticRegression: [
    { fpr: 0, tpr: 0 }, { fpr: 0.01, tpr: 0.45 }, { fpr: 0.02, tpr: 0.62 },
    { fpr: 0.05, tpr: 0.78 }, { fpr: 0.08, tpr: 0.85 }, { fpr: 0.1, tpr: 0.88 },
    { fpr: 0.15, tpr: 0.92 }, { fpr: 0.2, tpr: 0.94 }, { fpr: 0.3, tpr: 0.96 },
    { fpr: 0.4, tpr: 0.97 }, { fpr: 0.5, tpr: 0.98 }, { fpr: 0.7, tpr: 0.99 },
    { fpr: 1.0, tpr: 1.0 },
  ],
  decisionTree: [
    { fpr: 0, tpr: 0 }, { fpr: 0.01, tpr: 0.35 }, { fpr: 0.02, tpr: 0.52 },
    { fpr: 0.05, tpr: 0.68 }, { fpr: 0.08, tpr: 0.76 }, { fpr: 0.1, tpr: 0.8 },
    { fpr: 0.15, tpr: 0.84 }, { fpr: 0.2, tpr: 0.87 }, { fpr: 0.3, tpr: 0.91 },
    { fpr: 0.4, tpr: 0.93 }, { fpr: 0.5, tpr: 0.95 }, { fpr: 0.7, tpr: 0.97 },
    { fpr: 1.0, tpr: 1.0 },
  ],
};

// Task 4: Deep Learning (MLP) Results
export const mlpResults = {
  accuracy: 0.928,
  precision: 0.812,
  recall: 0.765,
  f1: 0.788,
  auc: 0.951,
  trainingTime: 2.847,
  inferenceTime: 0.003,
  lossCurve: [
    { epoch: 1, trainLoss: 0.62, valLoss: 0.58 },
    { epoch: 5, trainLoss: 0.45, valLoss: 0.42 },
    { epoch: 10, trainLoss: 0.35, valLoss: 0.33 },
    { epoch: 15, trainLoss: 0.28, valLoss: 0.29 },
    { epoch: 20, trainLoss: 0.22, valLoss: 0.25 },
    { epoch: 25, trainLoss: 0.18, valLoss: 0.22 },
    { epoch: 30, trainLoss: 0.15, valLoss: 0.21 },
    { epoch: 35, trainLoss: 0.13, valLoss: 0.20 },
    { epoch: 40, trainLoss: 0.11, valLoss: 0.19 },
    { epoch: 45, trainLoss: 0.10, valLoss: 0.19 },
    { epoch: 50, trainLoss: 0.09, valLoss: 0.18 },
    { epoch: 55, trainLoss: 0.08, valLoss: 0.18 },
    { epoch: 60, trainLoss: 0.08, valLoss: 0.18 },
  ],
};

export const modelComparison = [
  { model: 'Logistic Regression', accuracy: 0.912, precision: 0.785, recall: 0.723, f1: 0.753, auc: 0.934, trainTime: 0.042, inferenceTime: 0.001 },
  { model: 'Decision Tree', accuracy: 0.889, precision: 0.712, recall: 0.798, f1: 0.752, auc: 0.876, trainTime: 0.156, inferenceTime: 0.002 },
  { model: 'MLP Neural Network', accuracy: 0.928, precision: 0.812, recall: 0.765, f1: 0.788, auc: 0.951, trainTime: 2.847, inferenceTime: 0.003 },
];

// Task 5: Ethics Simulation Data
export const thresholdAnalysis = [
  { threshold: 0.2, precision: 0.52, recall: 0.95, fpPer10k: 480, fnPer10k: 75 },
  { threshold: 0.3, precision: 0.63, recall: 0.89, fpPer10k: 310, fnPer10k: 165 },
  { threshold: 0.5, precision: 0.785, recall: 0.723, fpPer10k: 145, fnPer10k: 415 },
  { threshold: 0.7, precision: 0.88, recall: 0.52, fpPer10k: 65, fnPer10k: 720 },
  { threshold: 0.9, precision: 0.95, recall: 0.28, fpPer10k: 22, fnPer10k: 1080 },
];

export const biasSimulation = {
  beforeMitigation: [
    { group: 'Group A (US)', fpr: 0.032, fnr: 0.28 },
    { group: 'Group B (UK)', fpr: 0.041, fnr: 0.31 },
    { group: 'Group C (CN)', fpr: 0.185, fnr: 0.15 },
    { group: 'Group D (RU)', fpr: 0.210, fnr: 0.12 },
    { group: 'Group E (Other)', fpr: 0.055, fnr: 0.26 },
  ],
  afterMitigation: [
    { group: 'Group A (US)', fpr: 0.038, fnr: 0.27 },
    { group: 'Group B (UK)', fpr: 0.042, fnr: 0.30 },
    { group: 'Group C (CN)', fpr: 0.065, fnr: 0.24 },
    { group: 'Group D (RU)', fpr: 0.072, fnr: 0.22 },
    { group: 'Group E (Other)', fpr: 0.048, fnr: 0.28 },
  ],
};

// Security insights from EDA
export const securityInsights = [
  {
    id: 1,
    title: 'Failed Login Ratio is the Strongest Indicator',
    description: 'Suspicious accounts show 5.5x higher failed login ratios (median 0.55 vs 0.10). This suggests brute-force or credential-stuffing attacks.',
    severity: 'high',
    icon: 'fa-shield-halved',
  },
  {
    id: 2,
    title: 'Night-Time Activity Spike',
    description: 'Suspicious activity peaks between 02:00-04:00 AM, while normal usage peaks during business hours. This temporal pattern is a strong signal.',
    severity: 'high',
    icon: 'fa-moon',
  },
  {
    id: 3,
    title: 'IP Reputation Score Correlation',
    description: 'IP reputation score has -0.73 correlation with suspicious activity. Low-reputation IPs are 6x more likely to be flagged.',
    severity: 'medium',
    icon: 'fa-network-wired',
  },
  {
    id: 4,
    title: 'New Device Risk Factor',
    description: 'Accounts flagged as suspicious are 3x more likely to use new/unrecognized devices. Device fingerprinting is critical.',
    severity: 'medium',
    icon: 'fa-laptop',
  },
  {
    id: 5,
    title: 'Geographic Anomalies',
    description: 'Certain countries show disproportionately high suspicious rates (CN: 48.7%, RU: 59.2%, NG: 54.5%), suggesting geo-targeted attacks.',
    severity: 'high',
    icon: 'fa-globe',
  },
  {
    id: 6,
    title: 'Data Exfiltration Pattern',
    description: 'Suspicious accounts send significantly more bytes (median 8000 vs 1200), indicating potential data exfiltration attempts.',
    severity: 'high',
    icon: 'fa-arrow-up-from-bracket',
  },
];

// Pipeline steps
export const pipelineSteps = [
  {
    step: 1,
    title: 'Data Collection & Generation',
    description: 'Synthetic login-attempt dataset with 10,000 records (85% normal, 15% suspicious). Includes 11 features with realistic distributions and injected missing values.',
    file: 'src/generate_data.py',
    icon: 'fa-database',
  },
  {
    step: 2,
    title: 'Exploratory Data Analysis',
    description: 'Comprehensive EDA with distribution analysis, correlation heatmaps, temporal patterns, and geographic analysis to identify threat indicators.',
    file: 'src/01_eda.py',
    icon: 'fa-chart-bar',
  },
  {
    step: 3,
    title: 'ML Classification',
    description: 'Logistic Regression and Decision Tree classifiers with proper preprocessing pipeline (imputation, encoding, scaling) to prevent data leakage.',
    file: 'src/02_ml_classification.py',
    icon: 'fa-brain',
  },
  {
    step: 4,
    title: 'Neural Network Comparison',
    description: 'MLPClassifier (64,32) architecture comparison with training time analysis, loss curves, and practical feasibility assessment.',
    file: 'src/03_dl_comparison.py',
    icon: 'fa-microchip',
  },
  {
    step: 5,
    title: 'Ethics & Fairness Simulation',
    description: 'Threshold analysis for FP/FN trade-offs, bias detection across demographic groups, and mitigation strategies for algorithmic fairness.',
    file: 'src/04_ethics_simulation.py',
    icon: 'fa-scale-balanced',
  },
];
