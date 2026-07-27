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

    // Ambil MURNI hanya dari teks pesan yang dikirim (dari pesan_masuk / user_message)
    const rawText = body?.user_message || body?.pesan_masuk || body?.message || body?.text || '';
    const text = String(rawText).toLowerCase();

    let intent = "UNKNOWN";

    // 1. CEK MANAJEMEN
    if (text.includes("manajemen") || text.includes("management") || text.includes("bisnis") || text.includes("business")) {
      if (text.includes("s1") || text.includes("ibm") || text.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (text.includes("s2") || text.includes("mem") || text.includes("magister") || text.includes("master")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. CEK INFORMATIKA (Hapus "it" 2 huruf biar gak nembak salah sasaran)
    else if (
      text.includes("informatika") || 
      text.includes("imt") || 
      text.includes("komputer") || 
      text.includes("coding") || 
      text.includes("tech")
    ) {
      intent = "S1_IMT";
    }

    // Return intent bersih dengan Underscore
    return res.status(200).json({ response_text: intent });
  }

  return res.status(200).json({ response_text: "UNKNOWN" });
}