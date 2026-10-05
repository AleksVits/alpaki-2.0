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
  for(let state=0;state<4;state++){
   await p.locator('#apartments').evaluate(el=>el.scrollIntoView({behavior:'instant'}));
   await p.screenshot({path:`${out}/${width}-apt-${state}.png`});
   const geometry=await p.locator('#apartments').evaluate(el=>{
    const names=['.apt-house__copy','.apt-house__row','.plan-card','.apt__pager','.scroll-hint','.apt-3d__scene','.apt-floor__list'];
    return names.flatMap(s=>{const e=el.querySelector(s);if(!e)return [];const r=e.getBoundingClientRect();return [{s,x:r.x,y:r.y,w:r.width,h:r.height,scroll:e.scrollWidth,client:e.clientWidth}]});
   });
   report.push({width,state,geometry});
   await p.locator('#apartments .pager__btn').last().evaluate(el=>el.click());
  }
  await p.locator('#contacts').evaluate(el=>el.scrollIntoView({behavior:'instant'}));
  await p.locator('.form__check button').evaluate(el=>el.click());
  await p.screenshot({path:`${out}/${width}-privacy.png`});
  report.push({width,modal:await p.locator('.modal').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})});
 }
 fs.writeFileSync(`${out}/states.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
