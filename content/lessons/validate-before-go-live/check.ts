import type { RetrievalItem } from "../../../src/data/types";
export const checks: RetrievalItem[] = [
  {
    id: "principle",
    kind: "principle",
    prompt:
      "A pooled concordance rate is high but one reader has repeated discordances. What is next?",
    choices: [
      {
        id: "supported",
        label: "Investigate that reader and the cases",
        correct: true,
        feedback:
          "Pooling can conceal a reader-specific or workflow-specific problem. Review causes and readiness for the intended use before clinical approval.",
      },
      {
        id: "shortcut",
        label: "Approve every reader from the pooled rate",
        feedback:
          "This leaves the central problem unresolved. Pooling can conceal a reader-specific or workflow-specific problem. Review causes and readiness for the intended use before clinical approval.",
      },
      {
        id: "incomplete",
        label: "Exclude the reader from the denominator",
        feedback:
          "This does not establish the needed conclusion. Pooling can conceal a reader-specific or workflow-specific problem. Review causes and readiness for the intended use before clinical approval.",
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
        label: "Review intended use and local validation protocol",
        correct: true,
        feedback:
          "The validation must represent the system, users and clinical use being approved.",
      },
      {
        id: "shortcut",
        label: "Reuse another institution validation unchanged",
        feedback:
          "This leaves the central problem unresolved. The validation must represent the system, users and clinical use being approved.",
      },
      {
        id: "incomplete",
        label: "Apply this case decision without checking local policy",
        feedback:
          "This does not establish the needed conclusion. The validation must represent the system, users and clinical use being approved.",
      },
    ],
  },
  {
    id: "spaced",
    kind: "spaced",
    fromLesson: "19",
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
];
