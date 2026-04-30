import {
  siPython, siPandas, siScikitlearn, siJupyter, siGit, siNumpy,
  siMicrosoftexcel, siMicrosoft, siTensorflow, siPytorch, siTableau,
  siGithub, siGooglecolab, siOdoo,
} from "simple-icons";

export type OrbitIcon = {
  name: string;
  path: string;
  color: string;
};

const make = (icon: { title: string; path: string; hex: string }, override?: string): OrbitIcon => ({
  name: override ?? icon.title,
  path: icon.path,
  color: `#${icon.hex}`,
});

// generic chart svg path for Power BI / SQL fallback
const CHART_PATH = "M3 3h2v18H3V3zm4 10h2v8H7v-8zm4-6h2v14h-2V7zm4 4h2v10h-2V11zm4-8h2v18h-2V3z";
const DB_PATH = "M12 2C7.58 2 4 3.79 4 6s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 8v4c0 2.21 3.58 4 8 4s8-1.79 8-4V8c0 2.21-3.58 4-8 4S4 10.21 4 8zm0 6v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4c0 2.21-3.58 4-8 4s-8-1.79-8-4z";
const SERVER_PATH = "M4 5h16v4H4V5zm0 6h16v4H4v-4zm0 6h16v4H4v-4zm3-9h2v2H7V8zm0 6h2v2H7v-2zm0 6h2v2H7v-2z";
const ORANGE_PATH = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12z";
const SEABORN_PATH = "M3 17l4-8 4 4 4-10 4 14H3z";

export const innerOrbit: OrbitIcon[] = [
  make(siPython),
  { name: "Power BI", path: CHART_PATH, color: "#F2C811" },
  { name: "SQL", path: DB_PATH, color: "#00d4aa" },
  make(siMicrosoftexcel, "Excel"),
];

export const middleOrbit: OrbitIcon[] = [
  make(siPandas),
  { name: "Matplotlib", path: SEABORN_PATH, color: "#11557C" },
  make(siScikitlearn, "Scikit-learn"),
  make(siJupyter),
  make(siGit),
  make(siNumpy),
];

export const outerOrbit: OrbitIcon[] = [
  { name: "SQL Server", path: SERVER_PATH, color: "#CC2927" },
  { name: "Orange", path: ORANGE_PATH, color: "#FF7900" },
  make(siOdoo),
  make(siTensorflow),
  make(siPytorch),
  make(siTableau),
  make(siGooglecolab, "Colab"),
  make(siGithub),
];
