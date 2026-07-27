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

    // Ambil string dari objek JSON mentah
    const fullBodyStr = JSON.stringify(body || {}).toLowerCase();

    let intent = "UNKNOWN";

    // 1. CEK MANAJEMEN
    if (fullBodyStr.includes("manajemen") || fullBodyStr.includes("management") || fullBodyStr.includes("bisnis")) {
      if (fullBodyStr.includes("s1") || fullBodyStr.includes("ibm") || fullBodyStr.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (fullBodyStr.includes("s2") || fullBodyStr.includes("mem") || fullBodyStr.includes("magister")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. CEK INFORMATIKA / IMT (Gunakan keyword spesifik)
    else if (
      fullBodyStr.includes("informatika") || 
      fullBodyStr.includes("imt") || 
      fullBodyStr.includes("komputer") || 
      fullBodyStr.includes("coding")
    ) {
      intent = "S1_IMT";
    }

    return res.status(200).json({ response_text: intent });
  }

  return res.status(200).json({ response_text: "UNKNOWN" });
}