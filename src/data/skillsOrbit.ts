import {
  siPython, siPandas, siScikitlearn, siJupyter, siGit, siNumpy,
  siTensorflow, siPytorch,
  siGithub, siGooglecolab, siOdoo,
} from "simple-icons";

const EXCEL_PATH = "M21.53 4.306H15.97v1.6h1.484v1.5H15.97v.997h1.484v1.5H15.97v.997h1.484v1.5H15.97v.997h1.484v1.5H15.97v.997h1.484v1.5H15.97v1.6h5.56c.260 0 .47-.21.47-.47V4.776c0-.260-.21-.47-.47-.47zM2 5.5L9.5 4v16L2 18.5v-13zm4 4l1.3 2.5L6 14.5h1.2L8 12.7l.8 1.8H10l-1.3-2.5L10 9.5H8.8L8 11.3 7.2 9.5H6z";
const TABLEAU_PATH = "M11.654.174v2.377H9.682v1.45h1.972v2.378h.696V4.001h1.972v-1.45h-1.972V.174h-.696zM6.293 5.155v2.377H4.32v1.45h1.972v2.378h.696V8.982H8.96v-1.45H6.989V5.155h-.696zm10.718 0v2.377h-1.972v1.45h1.972v2.378h.696V8.982h1.972v-1.45h-1.972V5.155h-.696zM2.474 11.31v1.523H.502v.928h1.972v1.523h.696v-1.523h1.972v-.928H3.17V11.31h-.696zm18.353 0v1.523h-1.972v.928h1.972v1.523h.696v-1.523h1.972v-.928h-1.972V11.31h-.696zm-9.176 1.45v2.377H9.679v1.45h1.972v2.378h.696v-2.378h1.972v-1.45h-1.972V12.76h-.696z";
const MS_PATH = "M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z";

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
