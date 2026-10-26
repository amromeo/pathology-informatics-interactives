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
    note: "PNG preserves the decoded pixels at this step. It does not undo earlier compression or acquisition blur, and this field cannot establish clinical suitability.",
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
    note: "Preserve approved source images and acquisition history. Test difficult detail, completeness, retrieval, display, and downstream analysis; then obtain clinical approval and document a retention and recovery plan.",
  },
  {
    id: "smallest",
    label: "Replace all source images with the smallest files.",
    note: "The smallest files may omit information needed for a different task. Storage savings alone do not justify destroying approved source images or changing retention policy.",
  },
  {
    id: "dicom",
    label: "Convert to DICOM and approve without further testing.",
    note: "DICOM can carry standardized image and specimen information. A successful conversion does not prove correct identity, pixel fidelity, viewer support, or clinical performance.",
  },
];

export const sectionPurposes = [
  "Compare discarded image samples with compression artifacts before changing acquisition.",
  "Change the workload assumptions and inspect their separate storage and transfer effects.",
];
