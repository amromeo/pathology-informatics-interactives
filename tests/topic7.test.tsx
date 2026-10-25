import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { storage, observations } from '../content/lessons/pixel-budget/interaction';
import images from '../content/lessons/pixel-budget/images.json';
import { initialValidation, revisedValidation, reviewValidation, studyRows, changes } from '../content/lessons/validate-before-go-live/interaction';
import { performance, candidates, readerStudy } from '../content/lessons/human-plus-algorithm/interaction';
import { lessons } from '../src/data/curriculum';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PixelBudgetExperience } from '../src/components/PixelBudgetExperience';
import { MitosisReviewExperience } from '../src/components/MitosisReviewExperience';

test('sampling doubles both axes, planes and copies have separate effects',()=>{
 const a=storage(.5,10,1,2),b=storage(.25,10,1,2);
 assert.equal(a.raw,1.8e9);assert.equal(b.raw,7.2e9);assert.equal(b.annualTB,180);assert.equal(b.seconds,57.6);
 assert.equal(storage(.25,10,3,2).annualTB,540);
 assert.equal(storage(.25,10,1,1).annualTB,90);
 assert.equal(storage(.5,30,1,2).stored,60e6);
 assert.throws(()=>storage(0,10,1,2));assert.throws(()=>storage(.5,0,1,2));
});
test('comparison files match recorded byte sizes and preserve distinct operations',()=>{
 assert.equal(images.length,6);
 for(const r of images)assert.equal(readFileSync('public/assets/topic7/'+r.path).length,r.bytes);
 assert.equal(images.find(r=>r.variant==='reduced')!.width,128);
 assert.equal(images.find(r=>r.variant==='compressed')!.width,512);
 assert.equal(observations.filter(r=>r.correct).length,1);
});
test('validation distinguishes a sufficient plan from initial gaps and failed investigations',()=>{
 assert.equal(reviewValidation(initialValidation,{}).filter(r=>r.pass).length,0);
 assert.ok(reviewValidation(revisedValidation,{V12:'rescan',V44:'review'}).every(r=>r.pass));
 for(const key of ['scope','cases','method','washout','system'] as const)assert.ok(reviewValidation({...revisedValidation,[key]:initialValidation[key]},{V12:'rescan',V44:'review'}).some(r=>!r.pass),key);
 assert.equal(reviewValidation(revisedValidation,{V12:'exclude',V44:'review'}).filter(r=>r.pass).length,6);
 assert.equal(reviewValidation(revisedValidation,{V12:'rescan',V44:'replace'}).filter(r=>r.pass).length,6);
 assert.equal(reviewValidation({...revisedValidation,washout:'21'},{V12:'rescan',V44:'review'}).filter(r=>r.pass).length,7);
 assert.deepEqual(studyRows.map(r=>[r.agree,r.total]),[[58,60],[14,17]]);
 assert.equal(new Set(changes.map(r=>r.answer)).size,3);
});
test('threshold boundary is inclusive and zero-mark predictive value is undefined',()=>{
 assert.equal(performance(.6).rows.find(r=>r.id==='M03')!.marked,true);
 assert.equal(performance(.60001).rows.find(r=>r.id==='M03')!.marked,false);
 const p=performance(.5);assert.deepEqual([p.tp,p.fn,p.fp,p.tn],[3,2,3,4]);
 assert.deepEqual([performance(0).tp,performance(0).fp],[5,7]);
 assert.equal(performance(1).ppv,null);assert.equal(performance(1).specificity,1);
 assert.throws(()=>performance(NaN));assert.throws(()=>performance(-.1));
});
test('site denominators and independent reader study remain accountable',()=>{
 const a=performance(.5,'A'),b=performance(.5,'B');
 assert.deepEqual([a.tp,a.fn,a.fp,a.tn],[3,0,1,2]);
 assert.deepEqual([b.tp,b.fn,b.fp,b.tn],[0,2,2,2]);
 assert.equal(candidates.length,12);
 const before=JSON.stringify(readerStudy);performance(.1);assert.equal(JSON.stringify(readerStudy),before);
 for(const row of readerStudy)assert.equal(row.found+row.missed,40);
});
test('Topic 7 uses bespoke stable routes with explicit coverage and open debrief registration',()=>{
 const t7=lessons.filter(r=>r.manifest.topic===7);
 assert.deepEqual(t7.map(r=>r.manifest.slug),['pixel-budget','validate-before-go-live','human-plus-algorithm']);
 for(const r of t7){assert.notEqual(r.manifest.experience,'generic');assert.ok(r.manifest.pierCoverage?.length);assert.ok(r.manifest.sources.length>=3);}
 for(const slug of t7.map(r=>r.manifest.slug))for(const part of ['introduction','concepts','bridge','debrief','faculty','practicum'])assert.ok(readFileSync(`content/lessons/${slug}/${part}.mdx`,'utf8').length>300);
});

test('image and algorithm controls have native labels, fieldsets, text metrics, and reset',()=>{
 const image=renderToStaticMarkup(<PixelBudgetExperience/>);
 assert.match(image,/aria-label="Tissue field"/);assert.match(image,/aria-label="Acquisition pixel spacing"/);
 assert.match(image,/alt="Glands and stroma; decoded reference"/);
 assert.doesNotMatch(image,/synthetic|fictional|educational-only/i);
 const model=renderToStaticMarkup(<MitosisReviewExperience/>);
 assert.match(model,/aria-label="Marking threshold"/);assert.match(model,/type="range"/);
 assert.match(model,/How should the pathologist review the area/);
 for(const html of [image,model]){assert.match(html,/aria-live="polite"/);assert.match(html,/Reset lesson interactions/);assert.doesNotMatch(html,/<button(?![^>]*type="button")/);}
});
