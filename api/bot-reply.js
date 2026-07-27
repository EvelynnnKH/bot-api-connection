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

    // Ambil isi teks pesan
    const userMsg = body?.user_message || body?.pesan_masuk || '';
    const fullBodyStr = JSON.stringify(body || {});
    const text = (userMsg + " " + fullBodyStr).toLowerCase();

    let intent = "UNKNOWN";

    // 1. CEK MANAJEMEN DULUAN
    if (text.includes("manajemen") || text.includes("management") || text.includes("bisnis")) {
      if (text.includes("s1") || text.includes("ibm") || text.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (text.includes("s2") || text.includes("mem") || text.includes("magister")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. CEK INFORMATIKA (HAPUS text.includes("it") KARENA BIKIN BUG KAKS/KAPUR/DLL)
    else if (
      text.includes("informatika") || 
      text.includes("imt") || 
      text.includes("komputer") || 
      text.includes("coding") || 
      text.includes("teknologi")
    ) {
      intent = "S1_IMT";
    }

    // Konsisten kembalikan dengan Underscore
    return res.status(200).json({ response_text: intent });
  }

  return res.status(200).json({ response_text: "UNKNOWN" });
}