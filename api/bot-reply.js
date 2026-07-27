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

    // Ubah seluruh body JSON menjadi string untuk pemindaian menyeluruh
    const fullPayloadStr = JSON.stringify(body || {}).toLowerCase();
    
    // Tangkap dari variabel umum
    const explicitText = (
      body?.pesan_masuk || 
      body?.user_message || 
      body?.message || 
      body?.text || 
      ''
    ).toLowerCase();

    // Gabungkan teks spesifik dan payload utuh
    const textToSearch = explicitText + " " + fullPayloadStr;

    let intent = "UNKNOWN";

    // 1. KONDISI MANAJEMEN
    if (textToSearch.includes("manajemen") || textToSearch.includes("management") || textToSearch.includes("bisnis")) {
      if (textToSearch.includes("s1") || textToSearch.includes("ibm") || textToSearch.includes("sarjana")) {
        intent = "S1_IBM";
      } else if (textToSearch.includes("s2") || textToSearch.includes("mem") || textToSearch.includes("magister")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL";
      }
    } 
    // 2. KONDISI INFORMATIKA / IMT
    else if (
      textToSearch.includes("informatika") || 
      textToSearch.includes("imt") || 
      textToSearch.includes("komputer") || 
      textToSearch.includes("coding") || 
      textToSearch.includes("tech")
    ) {
      intent = "S1_IMT";
    }

    // Jika masih UNKNOWN, kembalikan string payload biar keliatan di DEBUG RESULT
    const responseValue = intent !== "UNKNOWN" ? intent : `UNKNOWN_PAYLOAD:${fullPayloadStr}`;

    return res.status(200).json({ response_text: responseValue });
  }

  return res.status(200).json({ response_text: "UNKNOWN_NOT_POST" });
}