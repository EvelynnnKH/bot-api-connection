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

    // Ubah SELURUH objek body menjadi 1 string teks (apapun nama key variabel dari Qontak)
    const rawString = JSON.stringify(body || {}).toLowerCase();

    let intent = "UNKNOWN";

    // 1. MANAJEMEN CHECK
    if (rawString.includes("manajemen") || rawString.includes("management") || rawString.includes("bisnis")) {
      if (rawString.includes("s1") || rawString.includes("ibm") || rawString.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (rawString.includes("s2") || rawString.includes("mem") || rawString.includes("magister")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. INFORMATIKA / IMT CHECK
    else if (
      rawString.includes("informatika") || 
      rawString.includes("imt") || 
      rawString.includes("komputer") || 
      rawString.includes("coding") || 
      rawString.includes("teknologi")
    ) {
      intent = "S1_IMT";
    }

    // Mengembalikan response_text
    return res.status(200).json({ response_text: intent });
  }

  return res.status(200).json({ response_text: "UNKNOWN" });
}