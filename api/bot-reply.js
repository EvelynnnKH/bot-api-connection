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

    // Ambil MURNI teks yang diketik user saja
    const explicitText = (
      body?.user_message || 
      body?.pesan_masuk || 
      body?.message || 
      body?.text || 
      ''
    ).toLowerCase().trim();

    let intent = "UNKNOWN";

    // 1. KONDISI MANAJEMEN
    if (explicitText.includes("manajemen") || explicitText.includes("management") || explicitText.includes("bisnis")) {
      if (explicitText.includes("s1") || explicitText.includes("ibm") || explicitText.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (explicitText.includes("s2") || explicitText.includes("mem") || explicitText.includes("magister")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. KONDISI INFORMATIKA / IMT
    else if (
      explicitText.includes("informatika") || 
      explicitText.includes("imt") || 
      explicitText.includes("komputer") || 
      explicitText.includes("coding") || 
      explicitText.includes("tech")
    ) {
      explicitText = "S1_IMT";
    }

    // Kembalikan response_text dengan underscore (S1_IMT / MANAJEMEN_GENERAL)
    return res.status(200).json({ response_text: intent });
  }

  return res.status(200).json({ response_text: "UNKNOWN" });
}