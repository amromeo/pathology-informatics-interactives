export const imageVariants = [
  ["reference", "Decoded reference · PNG"],
  ["reduced", "128 × 128 pixels · PNG"],
  ["compressed", "512 × 512 pixels · JPEG quality 12"],
] as const;
export const imageRegions = [
  ["glands", "Glands and stroma"],
  ["focus", "Blurred upper-right field"],
] as const;
export const observations = [
  {
    id: "detail",
    label: "Both downsampling and strong JPEG compression can remove visible detail.",
    note: "Compare nuclear edges and the pale spaces between glands. Downsampling reduces samples; JPEG can add block and edge artifacts. Neither process restores missing focus.",
    correct: true,
  },
  {
    id: "zoom",
    label: "Enlarging the smaller image restores its original information.",
    note: "The viewer can enlarge pixels or interpolate between them, but it cannot recover the discarded samples. A higher zoom number is not a new acquisition.",
    correct: false,
  },
  {
    id: "png",
    label: "Saving the blurred field as PNG makes it suitable for diagnosis.",
    note: "PNG keeps the pixels exactly as they are at this step. It does not undo earlier compression or blur from scanning, and one patch of tissue cannot show an image is fit for diagnosis.",
    correct: false,
  },
];
export function storage(spacing: number, ratio: number, planes: number, copies: number) {
  if (
    ![0.25, 0.5].includes(spacing) ||
    ![1, 10, 30].includes(ratio) ||
    ![1, 3].includes(planes) ||
    ![1, 2].includes(copies)
  )
    throw new Error("Unsupported storage setting");
  const width = 15000 / spacing,
    height = 10000 / spacing;
  const raw = width * height * 3 * planes;
  const stored = raw / ratio;
  return {
    width,
    height,
    raw,
    stored,
    annualTB: (stored * 500 * 250 * copies) / 1e12,
    seconds: (stored * 8) / 100e6,
  };
}
export const storageChoices = [
  {
    id: "validate",
    label:
      "Compare candidate settings in the intended clinical workflow before changing the archive.",
    note: "Keep the approved original images and their scan history. Test hard-to-see detail, completeness, retrieval, display and any later image analysis; then get clinical approval and write down how long images are kept and how they would be recovered.",
  },
  {
    id: "smallest",
    label: "Replace all source images with the smallest files.",
    note: "The smallest files may lose information needed for some other task. Saving storage is not on its own a reason to destroy approved original images or change how long they are kept.",
  },
  {
    id: "dicom",
    label: "Convert to DICOM and approve without further testing.",
    note: "DICOM can carry standard image and specimen information. A conversion that runs without errors does not prove the identity is right, the pixels are unchanged, viewers can open it or that it works for diagnosis.",
  },
];

export const sectionPurposes = [
  "Compare discarded image samples with compression artifacts before changing acquisition.",
  "Change the workload assumptions and inspect their separate storage and transfer effects.",
];
