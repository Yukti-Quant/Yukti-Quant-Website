import type { LucideIcon } from 'lucide-react';
import {
  Server, Cpu, Database, Cloud, BrainCircuit, LineChart,
  Activity, ShieldCheck, Boxes, Gauge, Network, MonitorDot,
} from 'lucide-react';

export type NavItem = { id: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'technology', label: 'Technology' },
  { id: 'projects', label: 'Projects' },
  { id: 'vision', label: 'Vision' },
  { id: 'contact', label: 'Contact' },
];

export const BRAND = {
  name: 'YUKTI QUANT',
  tagline: 'Intelligence. Strategy. Execution.',
  founder: 'Nagesh Chavan',
  email: 'nageshcit882@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nageshchavan882',
  year: 2026,
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Algorithmic Trading & Automation',
    icon: LineChart,
    skills: ['Algorithmic Trading Systems', 'Strategy Development', 'Backtesting Engines', 'Trade Execution Automation', 'Market Data Processing', 'Technical Indicators', 'Risk Management', 'Order Management Systems', 'Real-time Trading Architecture', 'Broker API Integration'],
  },
  {
    title: 'Backend Engineering',
    icon: Server,
    skills: ['Python', 'Golang', 'FastAPI', 'Django', 'REST APIs', 'WebSockets', 'gRPC', 'Microservices', 'Async Processing', 'Concurrent Processing', 'Authentication', 'Authorization', 'Caching', 'Event-Driven Systems', 'Message Queues', 'API Design'],
  },
  {
    title: 'Database & Storage',
    icon: Database,
    skills: ['PostgreSQL', 'TimescaleDB', 'MySQL', 'Oracle', 'MongoDB', 'Redis', 'SQLite', 'Query Optimization', 'Indexing', 'Replication', 'Sharding', 'Transactions', 'Data Warehousing'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Linux / Ubuntu', 'Nginx', 'Jenkins', 'GitHub Actions', 'Terraform', 'Grafana', 'CloudWatch', 'CI/CD', 'Infrastructure as Code', 'Monitoring', 'Logging'],
  },
  {
    title: 'Data Engineering',
    icon: Cpu,
    skills: ['Pandas', 'NumPy', 'Polars', 'PySpark', 'Snowflake', 'Databricks', 'ETL / ELT', 'Data Pipelines', 'Kafka', 'Airflow', 'Data Modeling', 'Warehouse Design', 'Stream Processing', 'Delta Lake', 'Data Quality'],
  },
  {
    title: 'AI & Intelligent Systems',
    icon: BrainCircuit,
    skills: ['Machine Learning', 'Generative AI', 'LLM', 'RAG', 'LangChain', 'Prompt Engineering', 'Fine-Tuning', 'Vector Databases', 'NLP', 'Computer Vision', 'AI Agents', 'Model Evaluation', 'MLOps'],
  },
];

export type ArchitectureNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  { id: 'market-data', label: 'Market Data Layer', icon: Activity, description: 'Real-time tick ingestion, normalization, and historical replay across brokers and exchanges.' },
  { id: 'processing', label: 'Data Processing Layer', icon: Cpu, description: 'Stream and batch processing — cleaning, enrichment, feature computation, and storage.' },
  { id: 'research', label: 'Strategy Research Engine', icon: BrainCircuit, description: 'Hypothesis testing, parameter optimization, and walk-forward simulation over curated datasets.' },
  { id: 'signal', label: 'Signal Generation Engine', icon: LineChart, description: 'Rule-based and model-driven signals emitted from live market state with confidence scoring.' },
  { id: 'risk', label: 'Risk Management Engine', icon: ShieldCheck, description: 'Pre-trade checks, exposure limits, drawdown guards, and position-sizing enforcement.' },
  { id: 'execution', label: 'Order Execution Engine', icon: Gauge, description: 'Smart order routing, execution algorithms, and latency-aware broker integration.' },
  { id: 'portfolio', label: 'Portfolio & Position Management', icon: Boxes, description: 'Live positions, P&L attribution, rebalancing, and allocation governance.' },
  { id: 'monitoring', label: 'Monitoring & Analytics', icon: MonitorDot, description: 'Observability, execution analytics, alerting, and audit trails across the full stack.' },
];

export type ProjectCase = {
  id: string;
  title: string;
  tagline: string;
  overview: string;
  challenges: string[];
  architecture: string;
  tech: string[];
  contribution: string;
  icon: LucideIcon;
};

export const PROJECTS: ProjectCase[] = [
  {
    id: 'algo-platforms',
    title: 'Algorithmic Trading Platforms',
    tagline: 'AutoProfito · StockSync',
    overview:
      'Engineered strategy automation and trading execution workflows with real-time market data processing across multiple instruments and timeframes.',
    challenges: [
      'Coordinating low-latency market data ingestion with strategy evaluation loops.',
      'Designing reliable execution workflows that survive partial fills and broker disconnects.',
      'Keeping strategy logic decoupled from broker-specific quirks.',
    ],
    architecture:
      'Event-driven microservices — a market data service emits normalized ticks over a pub/sub bus; strategy workers consume and emit signals; an execution service translates signals into broker orders with idempotent reconciliation.',
    tech: ['Python', 'FastAPI', 'WebSockets', 'Redis', 'PostgreSQL', 'Broker APIs'],
    contribution: 'Built the core execution workflow, market data normalization layer, and strategy runtime that connected signals to broker order management.',
    icon: LineChart,
  },
  {
    id: 'go-backtest',
    title: 'Go Backtesting Engine',
    tagline: 'High-performance strategy simulation',
    overview:
      'A high-performance backtesting engine for historical market data processing, strategy simulation, and trade-level performance analytics.',
    challenges: [
      'Processing years of tick / candle data without exhausting memory or runtime.',
      'Producing trade-level analytics that match a live execution semantics model.',
      'Keeping the engine fast enough for parameter sweeps across thousands of runs.',
    ],
    architecture:
      'A pipelined Go backend ingests historical candles into memory-efficient structs, runs strategy callbacks over a replayed event loop, and emits trade records that feed an analytics aggregator.',
    tech: ['Golang', 'TimescaleDB', 'gRPC', 'JSON'],
    contribution: 'Designed the replay engine, trade matching model, and the analytics layer that produced per-trade and per-strategy performance reports.',
    icon: Gauge,
  },
  {
    id: 'scalping-automation',
    title: 'Scalping Automation Systems',
    tagline: 'Signal-to-execution automation',
    overview:
      'Automated trading workflows for short-horizon strategies — market data integration, signal generation, order management, and risk controls.',
    challenges: [
      'Operating within tight latency budgets from signal to order placement.',
      'Preventing runaway behaviour when market conditions shift rapidly.',
      'Enforcing hard risk ceilings per position and per session.',
    ],
    architecture:
      'A signal service evaluates live market state on every tick; a risk gate validates exposure and limits; an order manager dispatches with retry and confirmation tracking; a control loop monitors and halts on breach.',
    tech: ['Python', 'Async Processing', 'Redis', 'Broker APIs', 'Grafana'],
    contribution: 'Built the signal-to-order pipeline, risk gate, and the operational dashboard used to monitor and halt automated sessions.',
    icon: Activity,
  },
  {
    id: 'enterprise-data',
    title: 'Enterprise Data Engineering',
    tagline: 'Large-scale data migration & pipelines',
    overview:
      'Large-scale data migration and ETL/ELT pipelines spanning legacy systems and modern cloud warehouses, with Oracle and Snowflake integration.',
    challenges: [
      'Migrating terabyte-scale datasets with correctness guarantees and minimal downtime.',
      'Reconciling schema drift between source and target systems.',
      'Building pipelines observable and recoverable enough for production trust.',
    ],
    architecture:
      'Distributed processing jobs extract from Oracle, transform through staged validation, and load into Snowflake with idempotent checkpoints, orchestrated by a scheduler with full lineage tracking.',
    tech: ['PySpark', 'Snowflake', 'Oracle', 'Databricks', 'ETL / ELT'],
    contribution: 'Developed migration pipelines, validation frameworks, and the orchestration layer that kept long-running jobs recoverable and observable.',
    icon: Network,
  },
];

export type VisionPrinciple = {
  title: string;
  description: string;
};

export const VISION_PRINCIPLES: VisionPrinciple[] = [
  { title: 'Think Quantitatively', description: 'Every decision is grounded in data, evidence, and rigorously tested assumptions.' },
  { title: 'Engineer Relentlessly', description: 'Systems are built to be correct, observable, and resilient under real market conditions.' },
  { title: 'Execute Disciplined', description: 'Risk and process discipline over impulse. The system protects the strategy.' },
  { title: 'Build for the Long Term', description: 'A sustainable technology venture, not a chase after temporary success.' },
];

export const FOUNDER_STATS = [
  { value: 5, suffix: '+', label: 'Years Software Engineering' },
  { value: 3, suffix: '+', label: 'Years Algo Trading Exposure' },
];

export const ABOUT_PILLARS = [
  'Independent technology venture',
  'Algorithmic trading research',
  'Systematic strategy development',
  'Automation-first architecture',
  'Engineering-driven execution',
  'Continuous research & improvement',
];
