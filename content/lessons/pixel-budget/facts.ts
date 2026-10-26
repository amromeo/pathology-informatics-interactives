import { storage } from "./interaction";
const estimate = storage(0.5, 1, 1, 1);
export const file = "bridge.mdx";
export const facts = [
  { name: "image width", actual: estimate.width, pattern: /grid is ([\d,]+) ×/ },
  { name: "image height", actual: estimate.height, pattern: /× ([\d,]+) pixels/ },
  {
    name: "annual slides",
    actual: (estimate.annualTB * 1e12) / estimate.stored,
    pattern: /([\d,]+) slides annually/,
  },
];
