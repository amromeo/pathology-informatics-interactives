import type { PierCoverageClaim, SourceReference } from './types';
const source=(label:string,url:string,use:string):SourceReference=>({label,url,use,license:'Primary source; cited and paraphrased. No figures or tables reproduced.'});
const dicom=source('DICOM PS3.3 2026d — whole-slide microscopy','https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_A.32.8.html','Tiles, frames, resolution layers; see C.8.12.4 for compression history.');
const cap=source('CAP 2021 WSI validation guideline update','https://www.cap.org/wp-content/uploads/documents/wsi-summary-recommendations.pdf','Representative case counts, intraobserver concordance, investigation below 95%, and two-week washout.');
const fda=source('FDA DEN160056 decision summary','https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN160056.pdf','Historical device-specific intended-use example; not labeling for other current devices.');
const stats=source('FDA diagnostic-test statistical guidance','https://www.fda.gov/regulatory-information/search-fda-guidance-documents/statistical-guidance-reporting-results-studies-evaluating-diagnostic-tests-guidance-industry-and-fda','Reference standards, sensitivity, specificity, and study population.');
const gmlp=source('IMDRF GMLP N88 FINAL:2025','https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles','Independent evaluation, representative data, human–AI performance, and monitoring.');
const claim=(id:string,objective:string,summary:string,learnerAction:string,primary=true):PierCoverageClaim=>({id,objective,summary,learnerAction,primary});
export const topic7Plan:Record<string,{pierCoverage:PierCoverageClaim[]}>={
 'pixel-budget':{pierCoverage:[
  claim('7.1-image-workflow','7.1','Capture, storage, retrieval, viewing; static, live, and whole-slide applications','Compare fields, trace image identity and retrieval, and recommend checks for the reporting workflow.'),
  claim('7.2-image-settings','7.2','Formats, resolution, compression, display, and practical storage','Inspect identical regions after downsampling and encoding, calculate storage tradeoffs, and reject approval based on extension or size alone.'),
 ]},
 'validate-before-go-live':{pierCoverage:[
  claim('7.1-intended-applications','7.1','Different evidence needs for fixed tissue, frozen consultation, and remote use','Bound the requested scope to the application and system supported by the packet.',false),
  claim('7.4-wsi-validation','7.4','Validation guidance, device scope, clinical approval, and change review','Build a representative paired comparison, retain and investigate disagreements, recommend an approval boundary, and classify subsequent changes.'),
 ]},
 'human-plus-algorithm':{pierCoverage:[
  claim('7.3-image-analysis','7.3','Processing, detection, counting, diagnosis versus prognosis, and productivity','Change an inclusive threshold, inspect false marks and misses, compare final reader performance, and build monitoring.'),
  claim('2.4-image-ai','2.4','Independent testing, case mix, human factors, and oversight','Separate candidate metrics from final reader outcomes and investigate site-specific monitoring findings.',false),
 ]},
};
export const topic7Sources:Record<string,SourceReference[]>={'pixel-budget':[dicom],'validate-before-go-live':[cap,fda],'human-plus-algorithm':[stats,gmlp]};
