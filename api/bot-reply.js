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

    const text = (body?.user_message || '').toLowerCase();
    let intent = "UNKNOWN";

    // 1. MANAJEMEN 
    if (text.includes("manajemen") || text.includes("management") || text.includes("bisnis") || text.includes("business")) {
      if (text.includes("s1") || text.includes("ibm") || text.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (text.includes("s2") || text.includes("mem") || text.includes("magister") || text.includes("master")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. INFORMATIKA 
    else if (
      text.includes("informatika") || 
      text.includes("imt") || 
      text.includes("it") || 
      text.includes("komputer") || 
      text.includes("coding") || 
      text.includes("tech")
    ) {
      intent = "S1_IMT";
    }

    return res.status(200).json({ response_text: intent });
  }

  return res.status(200).json({ response_text: "UNKNOWN" });
}