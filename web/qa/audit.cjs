const { baseUrl, launch } = require('./browser.cjs');
const fs = require('node:fs');
const path = require('node:path');
const out = process.env.QA_OUTPUT || 'qa-output';
fs.mkdirSync(out, { recursive: true });
const sizes = process.env.QA_TOUCH ? [[320,568],[390,844],[768,1024],[1024,768]] : [[320,568],[375,667],[390,844],[430,932],[720,1024],[768,1024],[844,390],[900,700],[901,700],[1024,768],[1366,768],[1440,900],[1279,800],[1280,800],[1580,900],[1920,1080],[2560,1440],[3840,2160]];
(async () => {
 const browser = await launch();
 const page = await browser.newPage({ reducedMotion: 'reduce', hasTouch: !!process.env.QA_TOUCH });
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 page.on('response', r => {if(r.url().startsWith(baseUrl)&&r.status()>=400) errors.push(`${r.status()} ${r.url()}`)});
 const results = [];
 for (const [width,height] of sizes) {
  await page.setViewportSize({width,height});
  await page.goto(baseUrl);
  await page.evaluate(() => document.fonts.ready);
  for (const lang of ['ua','en']) {
   // The language is saved between visits, so select it explicitly for every pass.
   await page.locator('.header__langs--bar button')[lang === 'en' ? 'last' : 'first']().evaluate(el=>el.click());
   await page.waitForFunction(l=>document.documentElement.lang===l, lang === 'en' ? 'en' : 'uk');
   const sections = await page.locator('.stage').evaluateAll(els=>els.map(el=>el.id));
   const issues=[];
   for(const id of sections) {
    await page.locator('#'+id).evaluate(el=>el.scrollIntoView({behavior:'instant'}));
    await page.waitForTimeout(60);
    const findings=await page.locator('#'+id).evaluate(section=>{
     const bounds=section.getBoundingClientRect();
     return [...section.querySelectorAll('h1,h2,h3,p,li,button,a,input,textarea')].flatMap(el=>{
      const r=el.getBoundingClientRect(), s=getComputedStyle(el);
      if(!r.width||!r.height||s.visibility==='hidden'||s.display==='none'||s.opacity==='0')return [];
      let ancestor=el.parentElement;
      while(ancestor!==section&&ancestor){const a=getComputedStyle(ancestor);if(a.opacity==='0'||a.visibility==='hidden'||['auto','scroll'].includes(a.overflowX))return [];ancestor=ancestor.parentElement;}
      const horizontal=r.left < -1 || r.right > innerWidth+1;
      const vertical=r.top<bounds.top-1 || r.bottom>bounds.bottom+1;
      return horizontal||vertical ? [{element:el.className||el.tagName,text:el.textContent.slice(0,65),horizontal,vertical,rect:[r.x-bounds.x,r.y-bounds.y,r.width,r.height].map(Math.round)}]:[];
     });
    });
    if(findings.length)issues.push({id,findings});
    if(lang==='ua'&&[320,1024,1920,3840].includes(width)&&['infrastructure','invest-formats','contacts','apartments'].includes(id))await page.screenshot({path:path.join(out,`${width}-${id}.png`)});
   }
   results.push({width,height,lang,issues});
  }
  console.log(`${width}x${height}: ${results.slice(-2).map(r=>r.lang+': '+r.issues.length).join(', ')}`);
 }
 fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify({errors,results},null,2));
 await browser.close();
 if(errors.length||results.some(r=>r.issues.length))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
