# Topic 7 browser verification

Completed October 22, 2026 using the in-app browser through cua_repl.
The preview for this worktree ran on port 4187. The browser tool granted access
in this task after the user explicitly requested QA. No alternate browser or
security bypass was used. The earlier rejected port-4174 attempt is historical;
it did not establish which worktree was being served.

## Results

Desktop 1365×900 and phone 390×900 checks passed:
- All three lessons and faculty pages load, with no horizontal page overflow.
- Both image regions and all three variants load with meaningful alternatives.
- 0.25 µm, 10:1, one plane, two copies gives 180.0 TB and 57.6 seconds.
- Image-setting changes clear recommendations; reset restores defaults.
- WSI plan starts at 0/7; the specified fixed-tissue plan reaches 7/7 while
  still requiring corrective evidence and clinical approval.
- Excluding a difficult case produces explanatory feedback; changing the plan
  clears the prior result and recommendation. Change-review controls and reset work.
- Algorithm baseline is TP 3, FN 2, FP 3, TN 4. Threshold 0.60 includes M03;
  0.65 excludes it. At 1.00 predictive value is undefined. Keyboard Home/End
  and arrows adjust the slider.
- Site filters do not change the separate observed reader study.
- Marks-only and automatic-report choices explain their risks.
- Monitoring distinguishes incomplete and complete plans; edits clear decisions.
- Faculty source sections and layout checked at both widths.
- No captured browser errors or warnings.

Six screenshots saved: images, validation, and monitoring at both widths.
Visual inspection found no clipping/overlap in these views. The native focus
outline is visible on the image selector. Phone layouts stack image panels.

## Fix found during QA

Conditional feedback was included in radio/checkbox accessible names. Exact-name
selection acted but then could not verify the same control after its name changed.
Added stable aria-label values to Topic 7 choices; feedback remains adjacent and
announced via status regions. Rebuilt and verified exact-name selection after
feedback appeared, including all phone choice paths.

All 86 unit tests and the Pages build pass after the fix. Prior production build
and curriculum checks passed. Existing Vite large-bundle advisory remains.

check-browser.cjs is the standalone Playwright reproduction script. This task
executed its checks through the supported in-app locator API instead of launching
that script. Browser evidence is recorded in browser-result.json.

Publication: draft PR #4 was created from this task after the earlier task's
publication blockers. No merge or public deployment is included in this QA work.
