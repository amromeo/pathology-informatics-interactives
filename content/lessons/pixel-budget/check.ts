import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "Doubling both image dimensions at the same channels and bit depth does what to uncompressed pixels?",
    choices: [
      {
        id: "supported",
        label: "Multiplies the count by four",
        correct: true,
        feedback:
          "Width and height both double, so their product quadruples. Compression, pyramid levels and file overhead affect stored size separately.",
      },
      {
        id: "shortcut",
        label: "Doubles the count",
        feedback:
          "This leaves the central problem unresolved. Width and height both double, so their product quadruples. Compression, pyramid levels and file overhead affect stored size separately.",
      },
      {
        id: "incomplete",
        label: "Leaves the count unchanged",
        feedback:
          "This does not establish the needed conclusion. Width and height both double, so their product quadruples. Compression, pyramid levels and file overhead affect stored size separately.",
      },
    ],
  },
  {
    id: "transfer",
    kind: "transfer",
    prompt: "At your institution, what would you check first before proposing a change?",
    choices: [
      {
        id: "supported",
        label: "Check the intended viewing task",
        correct: true,
        feedback:
          "Determine the diagnostic detail and retrieval requirements before choosing image acquisition and storage settings.",
      },
      {
        id: "shortcut",
        label: "Choose the smallest file regardless of detail",
        feedback:
          "This leaves the central problem unresolved. Determine the diagnostic detail and retrieval requirements before choosing image acquisition and storage settings.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. Determine the diagnostic detail and retrieval requirements before choosing image acquisition and storage settings.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "5",
    prompt:
      "A tumor-board image has the right patient but the wrong block. What is the defensible repair?",
    choices: [
      {
        id: "supported",
        label: "Verify the block against the case record",
        correct: true,
        feedback:
          "Patient identity alone cannot establish specimen or block identity. Trace the accession, part and block before linking the slide to the molecular result.",
      },
      {
        id: "shortcut",
        label: "Link by patient name and report date",
        feedback:
          "This leaves the central problem unresolved. Patient identity alone cannot establish specimen or block identity. Trace the accession, part and block before linking the slide to the molecular result.",
      },
      {
        id: "incomplete",
        label: "Retain it because the diagnosis agrees",
        feedback:
          "This does not establish the needed conclusion. Patient identity alone cannot establish specimen or block identity. Trace the accession, part and block before linking the slide to the molecular result.",
      },
    ],
  },
];
