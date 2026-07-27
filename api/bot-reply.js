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

    // Logika Klasifikasi Intent
    if (text.includes("manajemen") || text.includes("management")) {
      if (text.includes("s1") || text.includes("ibm")) {
        intent = "S1_IBM";
      } else if (text.includes("s2") || text.includes("mem")) {
        intent = "S2_MEM";
      } else {
        intent = "MANAJEMEN_GENERAL"; // ambigu, tanya s1/s2
      }
    } else if (text.includes("informatika") || text.includes("imt") || text.includes("it")) {
      intent = "S1_IMT";
    } else if (text.includes("pendaftaran") || text.includes("maba") || text.includes("daftar")) {
      intent = "REGISTRATION";
    }

    // Mengembalikan JSON berisi intent
    return res.status(200).json({ intent: intent });
  }

  return res.status(200).json({ intent: "UNKNOWN" });
}