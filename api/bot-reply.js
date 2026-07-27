export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 1. Ambil pesan dari URL Query Param (misal: ?text=imt)
  const queryText = req.query?.text || req.query?.pesan_masuk || '';

  // 2. Ambil dari Body (jika ada)
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const bodyText = body?.pesan_masuk || body?.user_message || body?.message || '';

  // Gabungkan semua kemungkinan sumber pesan
  const rawText = queryText || bodyText || JSON.stringify(req.query) || '';
  const text = String(rawText).toLowerCase().trim();

  let intent = "UNKNOWN";

  // CEK MANAJEMEN
  if (text.includes("manajemen") || text.includes("management") || text.includes("bisnis")) {
    if (text.includes("s1") || text.includes("ibm") || text.includes("sarjana")) {
      intent = "S1_IBM";
    } else if (text.includes("s2") || text.includes("mem") || text.includes("magister")) {
      intent = "S2_MEM";
    } else {
      intent = "MANAJEMEN_GENERAL";
    }
  } 
  // CEK INFORMATIKA / IMT
  else if (
    text.includes("informatika") || 
    text.includes("imt") || 
    text.includes("komputer") || 
    text.includes("coding")
  ) {
    intent = "S1_IMT";
  }

  return res.status(200).json({ response_text: intent });
}