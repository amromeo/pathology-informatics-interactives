import { useState } from 'react';
import { imageRegions, imageVariants, observations, storage, storageChoices } from '../../content/lessons/pixel-budget/interaction';
import images from '../../content/lessons/pixel-budget/images.json';
import { Teaching, Topic5Section as Section, Topic5Select as Select, type Topic5Props } from './Topic5Common';

export function PixelBudgetExperience({Concepts,Bridge,onAttempt}:Topic5Props) {
 const [region,setRegion]=useState('glands'),[variant,setVariant]=useState('reduced');
 const [observation,setObservation]=useState(''),[choice,setChoice]=useState('');
 const [spacing,setSpacing]=useState(.5),[ratio,setRatio]=useState(10),[planes,setPlanes]=useState(1),[copies,setCopies]=useState(2);
 const result=storage(spacing,ratio,planes,copies);
 const asset=(v:string)=>images.find(r=>r.region===region&&r.variant===v)!;
 const reset=()=>{setRegion('glands');setVariant('reduced');setObservation('');setChoice('');setSpacing(.5);setRatio(10);setPlanes(1);setCopies(2);onAttempt?.(false);};
 return <div className="topic7">
 <Section title="Compare the same tissue field"><Teaching Content={Concepts}/>
 <div className="topic5-controls"><Select label="Tissue field" value={region} options={imageRegions} onChange={v=>{setRegion(v);setObservation('');}}/><Select label="Comparison image" value={variant} options={imageVariants} onChange={v=>{setVariant(v);setObservation('');}}/></div>
 <div className="t7-images">{['reference',variant].map((v,i)=>{const a=asset(v);return <figure key={i}><img src={`${import.meta.env?.BASE_URL??'/'}assets/topic7/${a.path}`} alt={`${region==='glands'?'Glands and stroma':'Blurred upper-right tissue'}; ${v==='reference'?'decoded reference':v==='reduced'?'reduced pixel grid':'strong JPEG compression'}`} style={{imageRendering:v==='reduced'?'pixelated':'auto'}}/><figcaption>{i===0?'Reference':imageVariants.find(r=>r[0]===v)![1]} · {a.width} × {a.height} pixels · {a.bytes.toLocaleString()} bytes</figcaption></figure>;})}</div>
 <fieldset className="t7-choices"><legend>What does the comparison support?</legend>{observations.map(r=><label key={r.id}><input type="radio" name="image-observation" checked={observation===r.id} onChange={()=>{setObservation(r.id);onAttempt?.(true);}}/><span>{r.label}{observation===r.id&&<small role="status">{r.note}</small>}</span></label>)}</fieldset>
 </Section>
 <Section title="Calculate the archive estimate"><Teaching Content={Bridge}/>
 <div className="topic5-controls"><Select label="Acquisition pixel spacing" value={String(spacing)} options={[["0.5","0.5 µm/pixel"],["0.25","0.25 µm/pixel"]]} onChange={v=>{setSpacing(Number(v));setChoice('');}}/><Select label="Assumed compression ratio" value={String(ratio)} options={[["1","1:1 · raw estimate"],["10","10:1"],["30","30:1"]]} onChange={v=>{setRatio(Number(v));setChoice('');}}/><Select label="Focal planes per slide" value={String(planes)} options={[["1","One"],["3","Three"]]} onChange={v=>{setPlanes(Number(v));setChoice('');}}/><Select label="Stored copies" value={String(copies)} options={[["1","One"],["2","Two"]]} onChange={v=>{setCopies(Number(v));setChoice('');}}/></div>
 <dl className="t7-metrics" aria-live="polite"><div><dt>Grid per plane</dt><dd>{result.width.toLocaleString()} × {result.height.toLocaleString()} pixels</dd></div><div><dt>Raw data per slide, all selected planes</dt><dd>{(result.raw/1e9).toFixed(2)} GB</dd></div><div><dt>Encoded base-layer data per slide, one copy</dt><dd>{(result.stored/1e9).toFixed(2)} GB</dd></div><div><dt>Annual storage, selected copies</dt><dd>{result.annualTB.toFixed(1)} TB</dd></div><div><dt>Ideal full-layer transfer, one copy</dt><dd>{result.seconds.toFixed(1)} seconds</dd></div></dl>
 <fieldset className="t7-choices"><legend>Recommendation to Dr. Rao and Malik</legend>{storageChoices.map(r=><label key={r.id}><input type="radio" name="storage-plan" checked={choice===r.id} onChange={()=>{setChoice(r.id);onAttempt?.(true);}}/><span>{r.label}{choice===r.id&&<small role="status">{r.note}</small>}</span></label>)}</fieldset>
 </Section><button type="button" className="text-button" onClick={reset}>Reset lesson interactions</button></div>;
}
