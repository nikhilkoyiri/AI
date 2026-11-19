import { motion } from 'framer-motion';
import { pipelineSteps } from '../data/projectData';
import { FileCode, Terminal, CheckCircle2 } from 'lucide-react';

export default function PipelineOverview() {
  const setupCommands = `# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Verify environment
python src/00_setup_check.py`;

  const requirementsContent = `numpy==1.24.3
pandas==2.0.3
scikit-learn==1.3.0
matplotlib==3.7.2
seaborn==0.12.2
jupyter==1.0.0
fpdf2==2.7.5
joblib==1.3.1`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Pipeline Architecture
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Complete end-to-end machine learning pipeline from data generation to ethical AI assessment.
          Each step is modular, well-documented, and reproducible.
        </p>
      </div>

      {/* Setup Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Setup Commands */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl bg-cyber-card border border-cyber-border overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-cyber-border bg-cyber-darker/50">
            <Terminal className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-300">Setup & Installation</span>
          </div>
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
            <code>{setupCommands}</code>
          </pre>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl bg-cyber-card border border-cyber-border overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-cyber-border bg-cyber-darker/50">
            <FileCode className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-medium text-gray-300">requirements.txt</span>
          </div>
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
            <code>{requirementsContent}</code>
          </pre>
        </motion.div>
      </div>

      {/* Pipeline Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Pipeline Steps</h2>
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-cyan-500/50 hidden md:block" />

          <div className="space-y-6">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 items-start"
              >
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-cyan-400">{step.step}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 rounded-xl bg-cyber-card border border-cyber-border hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyber-darker border border-cyber-border">
                    <FileCode className="w-3 h-3 text-gray-500" />
                    <code className="text-xs text-gray-500">{step.file}</code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Repository Structure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-cyber-card border border-cyber-border p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Repository Structure</h2>
        <pre className="text-sm text-gray-400 overflow-x-auto">
          <code>{`ai-cybersecurity-unit1-mini-project/
├── README.md                    # Project overview & setup
├── .gitignore                   # Git ignore rules
├── requirements.txt             # Pinned dependencies
├── data/
│   └── synthetic_logins.csv     # Generated dataset (10K records)
├── src/
│   ├── 00_setup_check.py        # Environment validation
│   ├── generate_data.py         # Synthetic data generator
│   ├── 01_eda.py                # Task 2: Exploratory analysis
│   ├── 02_ml_classification.py  # Task 3: ML classifiers
│   ├── 03_dl_comparison.py      # Task 4: Neural network
│   ├── 04_ethics_simulation.py  # Task 5: Fairness audit
│   ├── utils.py                 # Shared helpers
│   └── full_pipeline.ipynb      # Complete notebook
└── outputs/
    ├── plots/                   # All generated visualizations
    ├── metrics/                 # Saved model metrics (JSON)
    └── report/
        ├── technical_report.pdf # 6-10 page report
        └── ethics_notes.md      # Ethical considerations`}</code>
        </pre>
      </motion.div>

      {/* Key Design Decisions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { title: 'No Data Leakage', desc: 'ColumnTransformer + Pipeline ensures preprocessing is fit only on training data', color: 'cyan' },
          { title: 'Reproducible', desc: 'Random seed 42 set everywhere. All outputs saved to versioned directories', color: 'purple' },
          { title: 'Modular Design', desc: 'Each task is a standalone script. utils.py provides shared preprocessing', color: 'green' },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-xl bg-cyber-card border border-cyber-border">
            <h3 className={`text-sm font-semibold mb-2 ${
              item.color === 'cyan' ? 'text-cyan-400' : item.color === 'purple' ? 'text-purple-400' : 'text-green-400'
            }`}>{item.title}</h3>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
