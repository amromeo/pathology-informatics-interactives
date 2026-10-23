import { useState } from "react";
import { vendors, evidenceRows, initialWeights, vendorSummary, selectionSources, lifecycleCases, selectionCopy, type Weights } from "../../content/lessons/choose-and-govern-lis/interaction";
import { SourceInspector, Teaching, Topic5Section as Section, Topic5Select as Select, type Topic5Props } from "./Topic5Common";

export function LisSelectionExperience({Concepts,Bridge,onAttempt}:Topic5Props){
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [weights,setWeights]=useState<Weights>({...initialWeights});
 const [extras,setExtras]=useState(false);
 const [reviewed,setReviewed]=useState(false);
 const [lifecycle,setLifecycle]=useState<Record<string,string>>({});
 const [recommendation,setRecommendation]=useState("");
 const summaries=vendors.map(v=>vendorSummary(v.id,weights,answers,extras));
 const accurate=summaries.every(row=>row.accurate);
 const complete=lifecycleCases.every(row=>lifecycle[row.id]===row.answer);
 const chosen=summaries.find(row=>row.id===recommendation);
 const feedback=!accurate?selectionCopy.wrong:!extras?"Include the scoped interface, migration, and exit costs before comparing the five-year totals.":!complete?"Address installation, change control, downtime reconciliation, and record access before completing the recommendation.":recommendation==="defer"?selectionCopy.defer:chosen?.eligible?selectionCopy.ready:selectionCopy.blocked;
 return <div className="topic8-experience">
 <Section title="Read the procurement summary and requirements"><SourceInspector records={selectionSources}/></Section>
 <Section title="Check the evidence for mandatory requirements"><Teaching Content={Concepts}/>
 <div className="topic5-card-grid">{evidenceRows.map(row=><article key={row.id} className="artifact-card"><h3>{vendors.find(v=>v.id===row.vendor)!.name} · {row.requirement}</h3><p className="topic8-report">{row.record}</p>
 <Select label={row.id+" evidence"} value={answers[row.id]??""} options={[["","Classify the evidence"],["pass","Demonstrated requirement met"],["fail","Demonstrated requirement failed"],["unknown","Not yet verified"]]} onChange={value=>{setAnswers({...answers,[row.id]:value});setReviewed(false);setRecommendation("");}} note={answers[row.id]?(answers[row.id]===row.answer?"Classification supported. ":"Reconsider this classification. ")+row.note:undefined}/>
 </article>)}</div>
 <button type="button" className="primary-button" onClick={()=>{setReviewed(true);onAttempt?.(true);}}>Review nine evidence decisions</button>
 {reviewed&&<p role="status">{evidenceRows.filter(row=>answers[row.id]===row.answer).length} / 9 evidence decisions supported.</p>}
 </Section>
 <Section title="Compare preferences and five-year costs"><Teaching Content={Bridge}/>
 <div className="topic5-controls">{(["usability","analytics","training"] as const).map(key=><label className="topic5-control" key={key}><span>{key[0].toUpperCase()+key.slice(1)} weight: {weights[key]}</span><input type="range" aria-label={key+" weight"} min="0" max="100" step="10" value={weights[key]} onChange={event=>{setWeights({...weights,[key]:Number(event.target.value)});setRecommendation("");}}/></label>)}</div>
 <label className="topic8-cost"><input type="checkbox" checked={extras} onChange={event=>{setExtras(event.target.checked);setRecommendation("");}}/> Include interfaces, migration, and exit amounts</label>
 <p>{extras?"All five scoped cost categories are included; internal staffing and other exclusions remain outside these totals.":"Only upfront and five annual service charges are included. Other known or estimated costs are omitted, not zero."}</p>
 <div className="topic5-card-grid">{summaries.map(row=><article className="artifact-card" key={row.id}><h3>{row.name}</h3><p>Preference score: <strong>{row.score===null?"No weights selected":row.score.toFixed(2)+" / 5"}</strong></p><p>Evidence status: <strong>{!reviewed?"Review classifications first":row.eligible?"Three mandatory requirements supported":"Cannot recommend on current evidence"}</strong></p><dl className="topic8-costs"><dt>Upfront</dt><dd>{row.upfront}</dd><dt>Service: 5 × {row.annual}</dt><dd>{5*row.annual}</dd><dt>Interfaces{row.id==="alder"?" (allowance)":""}</dt><dd>{row.interfaces}</dd><dt>Migration</dt><dd>{row.migration}</dd><dt>Exit</dt><dd>{row.exit}</dd><dt>Included total (USD thousands)</dt><dd><strong>{row.cost}</strong></dd></dl></article>)}</div>
 <p>{selectionCopy.eligibility}</p></Section>
 <Section title="Plan installation, maintenance, and retirement">
 {lifecycleCases.map(row=><article className="topic8-preview" key={row.id}><h3>{row.title}</h3><p>{row.record}</p><Select label={row.title} value={lifecycle[row.id]??""} options={[["","Choose the next action"],...row.options]} onChange={value=>{setLifecycle({...lifecycle,[row.id]:value});setRecommendation("");}} note={lifecycle[row.id]?(row.notes as Record<string,string>)[lifecycle[row.id]]:undefined}/></article>)}
 <Select label="Selection recommendation" value={recommendation} options={[["","Choose a recommendation"],...vendors.map(v=>[v.id,"Proceed with "+v.name] as const),["defer","Defer pending specified evidence or contract questions"]]} onChange={value=>{setRecommendation(value);setReviewed(true);onAttempt?.(true);}}/>
 {recommendation&&<p className="topic5-note" role="status">{feedback}</p>}
 </Section>
 <button type="button" className="text-button" onClick={()=>{setAnswers({});setWeights({...initialWeights});setExtras(false);setReviewed(false);setLifecycle({});setRecommendation("");onAttempt?.(false);}}>Reset lesson interactions</button>
 </div>;
}
