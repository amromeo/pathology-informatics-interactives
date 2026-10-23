// Prepared for a separately authorized QA environment; NOT RUN in this session.
// Requires Playwright and installed Chrome, plus npm run preview:pages.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const root=process.env.QA_ROOT||'http://127.0.0.1:4174/pathology-informatics-interactives/';
 const output='review/topic7';
 const select=(name,value)=>page.getByRole('combobox',{name,exact:true}).selectOption(value);
 const text=()=>page.locator('main').innerText();
 const overflow=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),'Horizontal overflow');
 const debrief=async()=>{await page.getByRole('button',{name:'Open debrief',exact:true}).click();await page.locator('#lesson-debrief').waitFor();};
 const reset=()=>page.getByRole('button',{name:'Reset lesson interactions',exact:true}).click();
 for(const width of [1365,390]){
  await page.setViewportSize({width,height:900});
  await page.goto(root+'lessons/pixel-budget/');await debrief();await overflow();
  for(const region of ['glands','focus'])for(const variant of ['reference','reduced','compressed']){
   await select('Tissue field',region);await select('Comparison image',variant);
   assert.equal(await page.locator('.t7-images img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)),true);
  }
  await page.getByRole('radio',{name:'Enlarging the smaller image restores its original information.',exact:false}).check();
  assert.match(await text(),/cannot recover the discarded samples/);
  await select('Acquisition pixel spacing','0.25');
  assert.match(await page.locator('.t7-metrics').innerText(),/180.0 TB/);
  assert.match(await page.locator('.t7-metrics').innerText(),/57.6 seconds/);
  await page.getByRole('radio',{name:'Compare candidate settings in the intended clinical workflow before changing the archive.',exact:false}).check();
  await select('Stored copies','1');assert.equal(await page.getByRole('radio',{name:'Compare candidate settings',exact:false}).isChecked(),false);
  await page.locator('.t7-images').scrollIntoViewIfNeeded();await overflow();await page.screenshot({path:`${output}/images-${width}.png`});
  await reset();assert.equal(await page.getByRole('combobox',{name:'Acquisition pixel spacing',exact:true}).inputValue(),'0.5');
  await page.goto(root+'lessons/validate-before-go-live/');await debrief();
  await page.getByRole('button',{name:'Check the validation plan',exact:true}).click();assert.match(await text(),/0\/7 plan checks/);
  for(const [label,value] of [['Intended use for this review','fixed'],['Case selection','spectrum'],['Comparison method','paired'],['Time between digital and glass reads','14'],['System and workflow evidence','intended']])await select(label,value);
  await page.getByRole('radio',{name:'Remove this difficult biopsy from the denominator.',exact:true}).check();assert.match(await text(),/exaggerate performance/);
  await page.getByRole('radio',{name:'Review scan quality, rescan, and repeat affected workflow checks.',exact:false}).check();
  await page.getByRole('radio',{name:'Keep the disagreement, review clinical significance, and assess reader variability.',exact:false}).check();
  await page.getByRole('button',{name:'Check the validation plan',exact:true}).click();assert.match(await text(),/7\/7 plan checks/);
  await overflow();await page.locator('.t7-result').first().scrollIntoViewIfNeeded();await page.screenshot({path:`${output}/validation-${width}.png`});
  await select('Time between digital and glass reads','8');assert.doesNotMatch(await text(),/7\/7 plan checks/);
  for(const [label,value] of [['Viewer update changes image rendering.','targeted'],['Add frozen sections for intraoperative consultation.','new'],['Correct a user phone number; image workflow is unchanged.','document']])await select(label,value);
  await reset();assert.equal(await page.getByRole('combobox',{name:'Case selection',exact:true}).inputValue(),'easy');
  await page.goto(root+'lessons/human-plus-algorithm/');await debrief();
  const slider=page.getByRole('slider',{name:'Marking threshold',exact:true});
  await slider.focus();await page.keyboard.press('End');assert.match(await page.locator('.t7-metrics').innerText(),/Undefined/);
  await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');assert.equal(await slider.inputValue(),'0.05');
  for(let i=0;i<11;i++)await page.keyboard.press('ArrowRight');
  const m03=page.locator('.t7-candidates article').filter({has:page.getByRole('heading',{name:'M03 · Site A',exact:true})});
  assert.match(await m03.innerText(),/True positive/);await page.keyboard.press('ArrowRight');assert.match(await m03.innerText(),/False negative/);
  const readerBefore=await page.locator('.topic5-card-grid').first().innerText();await select('Locations included','B');assert.equal(await page.locator('.topic5-card-grid').first().innerText(),readerBefore);
  await page.getByRole('radio',{name:'Review marks and skip the unmarked tissue.',exact:true}).check();assert.match(await text(),/blank overlay is not evidence/);
  for(const box of await page.getByRole('checkbox').all())await box.check();await select('Response to the Month 2 findings','review');assert.match(await text(),/plan covers reference errors/);
  await page.getByRole('checkbox').first().uncheck();assert.equal(await page.getByRole('combobox',{name:'Response to the Month 2 findings',exact:true}).inputValue(),'');
  await page.getByRole('combobox',{name:'Response to the Month 2 findings',exact:true}).scrollIntoViewIfNeeded();await overflow();await page.screenshot({path:`${output}/monitoring-${width}.png`});
  await reset();assert.equal(await slider.inputValue(),'0.5');
  for(const slug of ['pixel-budget','validate-before-go-live','human-plus-algorithm']){await page.goto(root+'faculty/'+slug+'/');await overflow();assert.ok((await text()).includes('Sources'));}
 }
 assert.deepEqual(errors,[]);
 fs.writeFileSync(output+'/browser-result.json',JSON.stringify({status:'passed',root,widths:[1365,390],pageErrors:errors,screenshotsCaptured:6},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
