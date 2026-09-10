import test from "node:test";
import React from "react";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { approvedFlag, flagReplay, originalFlag } from "../content/lessons/follow-the-flag/interaction";
import { approvedNbs, nbsReplay, originalNbs } from "../content/lessons/newborn-screen-to-public-health/interaction";
import { mappingRows, terminologyRoles, terminologyScore } from "../content/lessons/code-the-meaning/interaction";
import { originalQueue, queueReport, queueRows, timeText } from "../content/lessons/invisible-bottleneck/interaction";
import { FlagExperience } from "../src/components/FlagExperience";
import { NewbornExperience } from "../src/components/NewbornExperience";
import { TerminologyExperience } from "../src/components/TerminologyExperience";
import { QueueExperience } from "../src/components/QueueExperience";

test("flag translation preserves both critical directions and routine categories", () => {
  assert.deepEqual(flagReplay(originalFlag).filter(row => !row.pass).map(row => row.id), ["FL-01","FL-02"]);
  assert.equal(flagReplay({ ...originalFlag, high:"HH" }).filter(row => row.pass).length, 5);
  assert.ok(flagReplay(approvedFlag).every(row => row.pass));
});
test("recognized flags can still lose severity and unknown must not become normal", () => {
  assert.equal(flagReplay({ ...approvedFlag, high:"H" })[0].pass, false);
  assert.equal(flagReplay({ ...approvedFlag, low:"L" })[1].pass, false);
  assert.equal(flagReplay({ ...approvedFlag, unknown:"normal" })[5].display, "Normal");
  assert.equal(flagReplay({ ...approvedFlag, unknown:"normal" })[5].pass, false);
});
test("newborn exchange needs both observation and answer mappings", () => {
  assert.equal(nbsReplay(originalNbs).filter(row => row.pass).length,5);
  assert.equal(nbsReplay({ ...originalNbs, observation:"overall" })[0].pass,false);
  assert.equal(nbsReplay({ ...approvedNbs, observation:"condition" })[0].pass,false);
  assert.ok(nbsReplay(approvedNbs).every(row => row.pass));
});
test("identity, retransmission and correction checks survive terminology repair", () => {
  assert.deepEqual(nbsReplay({ ...approvedNbs, identity:"number" }).filter(row => !row.pass).map(row => row.id),["NB-04"]);
  assert.deepEqual(nbsReplay({ ...approvedNbs, repeats:"new" }).filter(row => !row.pass).map(row => row.id),["NB-05","NB-06"]);
  assert.equal(nbsReplay(approvedNbs)[6].action,"Terminology exception");
  assert.equal(nbsReplay(approvedNbs)[7].action,"Preliminary review");
});
test("terminology review distinguishes properties, unsupported assays, and panel orders", () => {
  const roles = Object.fromEntries(terminologyRoles.map(row => [row.id,row.answer]));
  const mappings = Object.fromEntries(mappingRows.map(row => [row.id,row.expected]));
  assert.deepEqual(terminologyScore(roles,mappings),{ roles:7,mappings:4 });
  assert.equal(terminologyScore(roles,{ ...mappings,"TM-02":"2345-7" }).mappings,3);
  assert.equal(terminologyScore(roles,{ ...mappings,"TM-03":"ihc","TM-04":"single" }).mappings,2);
  assert.deepEqual(terminologyScore({},{}),{ roles:0,mappings:0 });
});
test("stale extract contains only earlier completed work and no peak evidence", () => {
  const report = queueReport(originalQueue);
  assert.equal(report.complete.length,6);
  assert.equal(report.median,20);
  assert.equal(report.p90,20);
  const peak = queueReport({ ...originalQueue,period:"peak" });
  assert.equal(peak.complete.length,0);
  assert.equal(peak.median,null);
});
test("current linked view preserves pending work without zero-duration imputation", () => {
  const report = queueReport({ ...originalQueue,freshness:"current",source:"linked" });
  assert.equal(report.observed.length,14);
  assert.equal(report.complete.length,12);
  assert.equal(report.pending.length,2);
  assert.equal(report.median,40);
  assert.equal(report.p90,80);
  assert.deepEqual(report.pending.map(row => report.cutoff-row.received),[114,113]);
  const lis = queueReport({ ...originalQueue,freshness:"current" });
  assert.equal(lis.omitted,2);
  assert.equal(lis.pending.length,0);
  assert.equal(lis.median,report.median);
});
test("peak delay occurs after analysis and all event sequences remain valid", () => {
  const config = { ...originalQueue,freshness:"current" as const,source:"linked" as const,period:"peak" as const };
  const total=queueReport(config), analysis=queueReport({ ...config,stage:"analysis" }), post=queueReport({ ...config,stage:"post" });
  assert.equal(total.median,72.5); assert.equal(total.p90,85);
  assert.equal(analysis.median,15); assert.equal(analysis.p90,15);
  assert.equal(post.median,57.5); assert.equal(post.p90,70);
  assert.equal(timeText(240),"12:00");
  assert.equal(new Set(queueRows.map(row => row.id)).size,14);
  assert.ok(queueRows.every(row => row.analyzed >= row.received && (row.released === null || row.released >= row.analyzed)));
});
test("new topic experiences expose labeled controls and text equivalents", () => {
  const flag=renderToStaticMarkup(<FlagExperience/>), nbs=renderToStaticMarkup(<NewbornExperience/>), terms=renderToStaticMarkup(<TerminologyExperience/>), queue=renderToStaticMarkup(<QueueExperience/>);
  assert.match(flag,/aria-label="Observation fields"/);
  assert.match(flag,/aria-label="Critical-high mapping"/);
  assert.match(nbs,/aria-label="Observation mapping"/);
  assert.match(terms,/aria-label="Mapping for TM-03"/);
  assert.match(queue,/<caption>/); assert.match(queue,/<th scope="row">Q-01/);
  for (const markup of [flag,nbs,terms,queue]) { assert.match(markup,/Reset lesson interactions/); assert.doesNotMatch(markup,/synthetic|fictional/i); }
});
