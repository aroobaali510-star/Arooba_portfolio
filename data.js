/* ==========================================================================
   PORTFOLIO DATA
   Edit this file to update your links, skills, projects, certifications,
   and roadmap. Everything below is rendered into the page automatically
   by js/script.js — you do not need to touch index.html for routine
   updates like adding a new project or skill.
   ========================================================================== */

/* ---- Profile & links -----------------------------------------------------
   Fill these in once. Every "GitHub", "LinkedIn", "Resume", and "Email"
   button/link on the whole site (hero, GitHub banner, contact, footer)
   reads from here, so they only need to be set in one place.
   -------------------------------------------------------------------------- */
const PROFILE = {
  name: "Arooba Ali",
  github: "https://github.com/aroobaali510-star",       // e.g. "https://github.com/aroobaali"
  linkedin: "https://www.linkedin.com/in/arooba-ali-125381391/",   // e.g. "https://linkedin.com/in/aroobaali"
  resume: "assets/images/Arooba_Ali_CV.pdf",       // e.g. a link to a hosted PDF
  email: "aroobaali510@gmail.com",             // e.g. "arooba@example.com"
  portfolioUrl: "YOUR_PORTFOLIO_URL", // your live GitHub Pages URL, once deployed
  /* Short phrases that rotate under the hero eyebrow. Keep them short. */
  focusRotator: ["Python", "Machine Learning", "Data Science", "Practical AI"]
};

/* ---- Skills ----------------------------------------------------------------
   To add a new category: copy one block and change icon / title / items.
   Icons use Bootstrap Icons class names (see bootstrap-icons.github.io).
   -------------------------------------------------------------------------- */
const SKILLS = [
  {
    icon: "bi-code-slash",
    title: "Programming",
    items: ["Python", "JavaScript", "HTML", "CSS","C","C++"]
  },
  {
    icon: "bi-bar-chart-line",
    title: "Data Science & ML",
    items: [
      "NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn",
      "Exploratory Data Analysis", "Data Preprocessing",
      "Feature Engineering", "Machine Learning", "Model Evaluation"
    ]
  },
  {
    icon: "bi-database",
    title: "Databases",
    items: ["SQL", "MySQL", "Firebase Realtime Database"]
  },
  {
    icon: "bi-phone",
    title: "Development",
    items: ["Android Development", "Firebase", "Bootstrap", "Basic Backend Development"]
  },
  {
    icon: "bi-tools",
    title: "Tools",
    items: ["Jupyter Notebook", "VS Code", "Anaconda", "Git / GitHub", "Streamlit"]
  }
  /* To add a category:
  {
    icon: "bi-cloud",
    title: "Your New Category",
    items: ["Skill One", "Skill Two"]
  },
  */
];

/* ---- ML learning roadmap ---------------------------------------------------
   status: "done" | "current" | "upcoming"
   -------------------------------------------------------------------------- */
const ROADMAP = [
  { title: "Python & Programming", desc: "Core syntax, data structures, and writing clean, reusable code.", status: "done" },
  { title: "NumPy & Pandas", desc: "Working with arrays and dataframes for real data manipulation.", status: "done" },
  { title: "Data Visualization", desc: "Communicating patterns clearly with Matplotlib and Seaborn.", status: "done" },
  { title: "Exploratory Data Analysis", desc: "Understanding a dataset before modeling it — distributions, correlations, anomalies.", status: "done" },
  { title: "Data Preprocessing", desc: "Handling missing values, outliers, and inconsistent data.", status: "done" },
  { title: "Feature Engineering", desc: "Currently deepening this — encoding, scaling, and building more useful features.", status: "current" },
  { title: "Machine Learning Algorithms", desc: "Applying and comparing models beyond the basics.", status: "current" },
  { title: "Model Evaluation", desc: "Cross-validation and metrics that go beyond a single accuracy score.", status: "current" },
  { title: "ML Projects", desc: "Applying the pipeline end-to-end on real datasets.", status: "done" },
  { title: "Deployment", desc: "Next up — taking models from notebook to a usable interface.", status: "upcoming" }
];

/* ---- Projects ----------------------------------------------------------------
   To add a new project: copy one block into the array.
   status: "progress" | "done"
   github / demo: use "" (empty string) to hide that button entirely.
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "Heart Disease Prediction",
    status: "done",
    statusLabel: "completed",
    description: "A machine learning project focused on predicting the presence of heart disease using patient-related clinical features.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
    details: [
      "Data loading and inspection",
      "Data cleaning and duplicate analysis",
      "Target analysis and exploratory data analysis",
      "Statistical analysis and outlier analysis using IQR",
      "Data preprocessing, categorical encoding, feature scaling",
      "Model development with cross-validation and evaluation"
    ],
    note: "Currently undergoing data-quality investigation and model evaluation — results shown so far are not final performance figures.",
    github: "https://github.com/aroobaali510-star/Heart-Disease-prediction",
    demo: "https://heart-disease-prediction-cysikmaqtmspzqvzpxdu4i.streamlit.app/"
  },
  {
    title: "Titanic Survival Prediction",
    status: "done",
    statusLabel: "Completed",
    description: "A machine learning classification project predicting passenger survival using demographic and ticket-related features.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
    details: [
      "Features used: Pclass, Sex, Age, SibSp, Parch, Fare, Embarked",
      "Missing value handling and numerical feature scaling",
      "Categorical encoding within a scikit-learn pipeline",
      "Logistic Regression model",
      "Model evaluation",
      "Deployed with an interactive Streamlit interface"
    ],
    note: "",
    github: "https://github.com/aroobaali510-star/Titanic-Survival-Prediction",
    demo: "https://titanic-survival-prediction-3hqxyzamo67xjn5zbgsk6v.streamlit.app/"
  },
  {
    title: "AttendEase",
    status: "done",
    statusLabel: "Completed · Academic Project",
    description: "An Android attendance management application designed to help students manage subjects and monitor attendance.",
    tags: ["Java", "Android Studio", "Firebase Auth", "Firebase Realtime DB"],
    details: [
      "User registration and login",
      "Subject management",
      "Attendance recording and tracking",
      "Attendance warning system",
      "Firebase-based data storage"
    ],
    note: "",
    github: "YOUR_ATTENDEASE_GITHUB",
    demo: ""
  }
  /* To add a project, copy this block and edit it:
  {
    title: "Your New Project",
    status: "progress",
    statusLabel: "In Progress",
    description: "One or two sentences describing the project.",
    tags: ["Python", "..."],
    details: ["Step one", "Step two"],
    note: "",
    github: "YOUR_NEW_PROJECT_GITHUB",
    demo: ""
  },
  */
];

/* ---- Certifications ---------------------------------------------------- */
/* ---- Certifications ---------------------------------------------------- */
const CERTIFICATIONS = [
  {
    title: "AI using Python",
    issuer: "DigiSkills",
    link: "assets/images/AI using python.jpeg"
  },
  {
    title: "Soft Communication Skills",
    issuer: "DigiSkills",
    link: "assets/images/communication and soft skill.jpeg"
  },
  {
    title: "AI and Career Empowerment",
    issuer: "University of Maryland",
    link: "assets/images/AI and Career Empowerment.jpeg"
  }

  /* Add more the same way:
  {
    title: "Certificate Name",
    issuer: "Issuing Platform",
    link: "assets/images/certificate-name.jpeg"
  },
  */
];

/* ---- Currently learning tags --------------------------------------------- */
const LEARNING = [
  "Advanced Machine Learning", "Model Evaluation", "Cross-Validation",
  "Feature Engineering", "NLP", "PCA / Dimensionality Reduction",
  "ML Deployment", "Practical AI Applications"
];
