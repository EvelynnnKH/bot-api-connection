export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }

    const userMessage = (body?.user_message || '').toLowerCase();
    let reply = "";

    if (userMessage.includes("manajemen") || userMessage.includes("management")) {
      if (userMessage.includes("s1") || userMessage.includes("ibm")) {
        reply = "Untuk S1 Management (IBM), fokus pada entrepreneurship & global business. Mau info kurikulumnya?";
      } else if (userMessage.includes("s2") || userMessage.includes("mem")) {
        reply = "Untuk S2 Master Executive Management (MEM), kelas cocok untuk profesional & business owner.";
      } else {
        reply = "Di UC Online Learning ada S1 Manajemen (IBM) dan S2 Manajemen (MEM). Mau info jenjang yang mana?";
      }
    } else {
      reply = "Ada yang bisa dibantu mengenai info jurusan UC Online Learning?";
    }

    // KIRIM KEMBALI SEBAGAI JSON DENGAN KEY response_text
    return res.status(200).json({ response_text: reply });
  }

  return res.status(200).json({ response_text: "API Bot Aktif!" });
}
