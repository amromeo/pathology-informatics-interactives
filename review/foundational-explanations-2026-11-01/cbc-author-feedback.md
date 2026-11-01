# Missing CBC: author feedback

Date: November 1, 2026. Branch: `codex/foundational-lesson-explanations`.
Reviewed changes against `abda3ac7beddc3f5196d95886682f5930b3890cf`.
The local Pages build is labeled `cbc-feedback`. These changes update draft PR 22
and are awaiting author review; they are not published.

## Feedback incorporated

The author asked for an internal hospital interface case, fuller basic explanations
of IP addresses, ports and TCP/IP, and direct descriptions without routine
“they do X; they do not do Y” or “X, not Y” framing.

- The LIS, interface engine and EHR now run in the health system's data center.
  After interface maintenance, the sender uses destination `10.20.30.40:5100`.
  The EHR's receiving service is running and listening at `10.20.30.40:5000`.
  Comparing those records identifies the incorrect destination port. The case no
  longer depends on a firewall or an outside EHR service.
- The explanation introduces protocols and packets, works through an IP address
  and port, explains “listening,” and describes TCP's handling of missing or
  out-of-order data. It names the client and server's jobs directly and follows
  the laboratory message through acknowledgment and chart review.
- Updated the map, records, questions, repair choices, restoration feedback,
  retrieval feedback, debrief, faculty guide and practicum together.
- Added the reusable writing preference and a concrete client/server example to
  the shared workspace `LESSON_STYLE_GUIDE.md`. That file is outside this curriculum
  repository and remains the shared guidance referenced by the lesson skill.

## Deliberate case changes

The old firewall evidence ID becomes `ehr-receiver`; the repair ID becomes
`correct-port`. All dependent scoring and checks use the new ID. The original
clinical results, analyzer/LIS times, server readings, queue of 214 and five
restoration outcomes are retained. The other two lessons in this batch are
unchanged by this follow-up. The source ledger records the supporting RFCs.

## Verification

- Curriculum validation: 23 lessons and 34 objectives pass.
- All 132 unit tests, ESLint, TypeScript and the Pages build pass. The build
  generates 55 route pages. Existing nonfatal font-cache and bundle-size warnings
  remain.
- All 12 targeted browser scenarios pass: learner and faculty routes at 1365,
  390 and 320 px; wrong/correct initial decisions; explanation before map building;
  tab-specific feedback; port comparison; and changing repair choices after checks.
  A restart passes zero checks, the port correction passes all five, and manual
  entry passes one. Changing the selected repair clears the previous outcomes.
- Actual in-app browser review at 1365×900 and 390×900 confirmed the expanded
  explanations and wrong/correct receiving-service feedback. The phone feedback
  remains beside its choices. No browser console errors were recorded. Phone
  review used a browser viewport, not a physical device.

Screenshots inspected:

- [IP address and port explanation, desktop](cbc-ip-port-desktop.png)
- [TCP/IP explanation, phone](cbc-tcp-phone.png)
- [Port comparison feedback, phone](cbc-port-feedback-phone.png)

Test logs and browser artifacts are in ignored `tmp/` files prefixed
`cbc-feedback`. The shared stylesheet and other lesson behavior were not changed.
