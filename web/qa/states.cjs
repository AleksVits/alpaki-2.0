const {baseUrl,launch}=require('./browser.cjs');
const fs=require('node:fs');
const out=process.env.QA_OUTPUT || 'qa-output';
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await launch();
 const p=await b.newPage({reducedMotion:'reduce'});
 const report=[];
 for(const [width,height] of [[320,568],[844,390],[1024,768],[1366,768],[1920,1080],[3840,2160]]){
  await p.setViewportSize({width,height});await p.goto(baseUrl);
  await p.evaluate(()=>document.fonts.ready);
  // Walk the apartment steps the way a visitor does: type → building → layout.
  const steps=[null,'#apartments .apt-type','#apartments .apt-house__card','#apartments .apt-pick__action .btn'];
  for(let state=0;state<steps.length;state++){
   if(steps[state]) await p.locator(steps[state]).first().evaluate(el=>el.click());
   await p.waitForTimeout(200);
   await p.locator('#apartments').evaluate(el=>el.scrollIntoView({behavior:'instant'}));
   await p.screenshot({path:`${out}/${width}-apt-${state}.png`});
   const geometry=await p.locator('#apartments').evaluate(el=>{
    const names=['.apt-progress','.apt-types','.apt-pick__cards','.apt-pick__action','.apt-pick__preview','.scroll-hint','.apt-3d__viewer','.apt-3d__cta'];
    return names.flatMap(s=>{const e=el.querySelector(s);if(!e)return [];const r=e.getBoundingClientRect();return [{s,x:r.x,y:r.y,w:r.width,h:r.height,scroll:e.scrollWidth,client:e.clientWidth}]});
   });
   report.push({width,state,geometry});
  }
  await p.locator('#contacts').evaluate(el=>el.scrollIntoView({behavior:'instant'}));
  await p.locator('.form__check button').evaluate(el=>el.click());
  await p.screenshot({path:`${out}/${width}-privacy.png`});
  report.push({width,modal:await p.locator('.modal').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})});
 }
 fs.writeFileSync(`${out}/states.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
