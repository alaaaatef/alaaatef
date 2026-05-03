export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "Contact" },
];

export const heroBlocks = [
  {
    title: "Alaa Atef",
    subtitle: "Junior Data Analyst",
    description:
      "3+ years in accounting and financial operations — I know what the numbers mean before I visualize them. Now I build dashboards, write SQL, train ML models, and turn messy data into decisions people can actually act on.",
  },
  {
    title: "Data That Moves.",
    subtitle: "SQL · Python · Power BI · Excel",
  },
  {
    title: "Built on Finance.",
    subtitle: "KPIs · Aging Reports · Cash Flow · ERP Systems",
  },
  {
    title: "3 Projects. Real Data.",
    subtitle: "E-Commerce DB · Body Performance ML · Sales Dashboard",
  },
];

export const aboutText = [
  "I've spent 3+ years sitting inside financial data — aging reports, ERP systems, cash flow statements, and hundreds of invoices a month. That's not a background story, that's the foundation. I understand what the numbers mean in a business context, not just what they look like in a chart.",
  "My stack now includes Python, SQL, Power BI, and machine learning. I've built a multi-schema relational database from scratch, trained neural networks on 13K+ records, and shipped dashboards that answer the questions management actually asks.",
  "I work fast, I care about accuracy, and I don't deliver outputs that need a manual to read.",
];

export const aboutStats = [
  { label: "Years in Financial Data", value: "3+" },
  { label: "ML Models Benchmarked", value: "5+" },
  { label: "Records Analyzed", value: "13K+" },
  { label: "Monthly Invoices Managed", value: "200+" },
];

export const uspItems = [
  {
    title: "Finance-First Thinking",
    icon: "chart",
    text: "Most analysts know the tools. I know the business context behind the data. 3+ years reading AR aging reports, cash flow statements, and KPI dashboards in live operations means I catch what others miss.",
  },
  {
    title: "Full-Stack Analytically",
    icon: "stack",
    text: "From raw SQL schema design to Python EDA, ML modeling, and Power BI dashboards — I handle the full pipeline. No hand-offs needed for data cleaning, transformation, modeling, or visualization.",
  },
  {
    title: "Results, Not Reports",
    icon: "target",
    text: "I build dashboards people actually use and models that answer the real question. Every output I deliver has a clear business insight attached — not just a chart that looks good.",
  },
];

export const experiences = [
  {
    role: "Applied AI & Data Analysis Trainee",
    company: "Digilians",
    period: "DEC 2025 – PRESENT",
    year: "2025",
    logo: "/logos/Digi.png",
    bullets: [
      "Learning practical applications of AI and Data Analysis through hands-on projects.",
      "Working with Python (Pandas, Matplotlib) for data analysis, EDA, and visualization.",
      "Applying statistical concepts and machine learning to real datasets.",
      "Building end-to-end analytical models using Excel, Power BI, SQL, and Python.",
    ],
  },
  {
    role: "AR Accountant",
    company: "Al-Freeh Real Estate and Investments",
    period: "JUL 2024 – APR 2025 · Saudi Arabia (Remote)",
    year: "2024",
    logo: "/logos/1710595782463.png",
    bullets: [
      "Monitored rent collection KPIs and identified payment delays, directly supporting reduction of overdue balances.",
      "Developed and analyzed aging reports to surface overdue trends and strengthen collection strategy — improving cash flow visibility for management.",
      "Issued invoices and maintained AR records with high accuracy within ERP systems.",
    ],
  },
  {
    role: "General Accountant",
    company: "Mishaal Group For Foodstuffs and Supplies",
    period: "DEC 2023 – JUL 2024 · Saudi Arabia (Remote)",
    year: "2023",
    logo: "/logos/1710595782463.png",
    bullets: [
      "Prepared daily sales and financial reports for senior management review.",
      "Performed bank reconciliations and managed petty cash and bank transfers.",
      "Recorded journal entries; tracked expenses, depreciation, and inventory stock variances.",
    ],
  },
  {
    role: "General Accountant",
    company: "Organic For Natural Oils",
    period: "JUN 2022 – AUG 2023 · Egypt",
    year: "2022",
    logo: "/logos/Organic.png",
    bullets: [
      "Managed 200+ invoices monthly; maintained daily journal entries with zero tolerance for error.",
      "Prepared bank reconciliations and analyzed accounts receivable/payable positions.",
      "Monitored cash flow and produced periodic financial summaries for ownership review.",
    ],
  },
];

export const projects = [
  {
    id: "01",
    title: "Body Performance Analytics",
    accent: "#00d4aa",
    image: "/projects/Body Performance.png",
    tagline: "End-to-End ML · Classification & Regression",
    description:
      "Analyzed 13,393 records across 12 physical features. Led EDA, feature engineering (BMI, Pulse Pressure), and benchmarked 5 ML models. Independently built the Neural Network — best result on the team: 75.77% classification accuracy and R² = 0.80 on regression.",
    skills: ["Python", "Scikit-learn", "Neural Network", "KNN", "SVM", "Random Forest", "Decision Tree", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/alaaaatef",
  },
  {
    id: "02",
    title: "FashioNest E-Commerce Database",
    accent: "#8B5CF6",
    image: "/projects/E-commerce.png",
    tagline: "Database Architecture · SQL Analytics · Power BI",
    description:
      "Designed FashioNestDB from scratch: 16 tables, 4 schemas (Inventory · CustomerMgmt · Sales · Logistics), 59 constraints. Built advanced SQL views for Customer LTV, SLA tracking, and delivery performance. Delivered full EDA in Python, Orange Data Mining analysis, and a 3-page Power BI dashboard on 9,481 records.",
    skills: ["SQL Server", "T-SQL", "Python", "Pandas", "Power BI", "Orange Data Mining", "Database Design"],
    githubUrl: "https://github.com/alaaaatef",
  },
  {
    id: "03",
    title: "Pizza Sales Dashboard",
    accent: "#EF4444",
    image: "/projects/Pizza sales dashboard.png",
    tagline: "Sales Analytics · KPI Engineering · Power BI",
    description:
      "Analyzed 49,000+ pizza orders end-to-end. Engineered KPIs including Average Order Value and customer segmentation. Visualized hourly/daily sales trends and product performance to identify peak operational times — delivering data-driven recommendations for menu optimization and staffing.",
    skills: ["Power BI", "Excel", "KPI Engineering", "Dashboard Design", "Data Visualization"],
    githubUrl: "https://github.com/alaaaatef",
  },
];

export const education = {
  logo: "/logos/University.png",
  degree: "Bachelor of Accounting (English Program)",
  faculty: "Faculty of Commerce",
  university: "Assiut University",
  year: "2023",
  grade: "Good",
  note: "English-track program — bilingual business and accounting foundation",
};

export const courses = [
  {
    id: "01",
    title: "Analyze Data to Answer Questions",
    provider: "Google",
    date: "Completed",
    image: "/courses/Analyze.png",
    skills: ["Pivot Tables And Charts", "SQL", "Query Languages", "Data Validation", "Data Transformation"],
  },
  {
    id: "02",
    title: "Process Data from Dirty to Clean",
    provider: "Google",
    date: "Completed",
    image: "/courses/process.png",
    skills: ["Data Quality", "Data Cleansing", "Data Integrity", "Spreadsheet Software", "Data Manipulation"],
  },
  {
    id: "03",
    title: "Prepare Data for Exploration",
    provider: "Google",
    date: "Completed",
    image: "/courses/prepare.png",
    skills: ["Data Ethics", "Unstructured Data", "Metadata Management", "Relational Databases", "Data Collection"],
  },
  {
    id: "04",
    title: "Ask Questions to Make Data-Driven Decisions",
    provider: "Google",
    date: "Completed",
    image: "/courses/Ask.png",
    skills: ["Dashboard", "Analytical Skills", "Quantitative Research", "Stakeholder Communications", "Data-Driven Decision-Making"],
  },
  {
    id: "05",
    title: "Foundations: Data, Data, Everywhere",
    provider: "Google",
    date: "Completed",
    image: "/courses/Foundations.png",
    skills: ["Data Visualization Software", "Data Sharing", "Data Literacy", "Analytics"],
  },
  {
    id: "06",
    title: "Delivering Quality Work with Agility",
    provider: "IBM",
    date: "Completed",
    image: "/courses/Delivering quality ibm.png",
    skills: ["Time Management", "Professional Development", "Quality Assurance", "Decision-Making"],
  },
];

export const contact = {
  email: "alaaa.atef956@gmail.com",
  phone: "+20 101 075 8269",
  location: "Cairo, Egypt",
  linkedin: "https://www.linkedin.com/in/alaa-atef-ahmed/",
  linkedinLabel: "LinkedIn",
  github: "https://github.com/alaaaatef",
  githubLabel: "github.com/alaaaatef",
};
