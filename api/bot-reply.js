export default function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = (req.body.user_message || '').toLowerCase();
    let reply = "";

    // Cek dulu apakah pesan mengandung unsur kata "manajemen" atau "management"
    if (/\b(manajemen|management)\b/.test(userMessage)) {
      
      // 1. Jika spesifik ke S1 / IBM
      if (/\b(s1|ibm|international business management)\b/.test(userMessage)) {
        reply = "Halo! Buat International Business Management (IBM) S1, kita fokus ke entrepreneurship dan global business nih. Mau info tentang kurikulum atau beasiswanya?";
      } 
      // 2. Jika spesifik ke S2 / MEM
      else if (/\b(s2|mem|master|executive)\b/.test(userMessage)) {
        reply = "Halo! Buat S2 MEM (Master Executive Management), programnya cocok buat profesional & business owner. Mau info jadwal atau biayanya?";
      } 
      // 3. Jika CUMA nulis "manajemen" tanpa kejelasan S1/S2 -> Tanya dulu
      else {
        reply = "Halo! Di UC ada program S1 Manajemen (IBM) dan S2 Manajemen (MEM) nih. Boleh tahu kamu lagi cari info buat jenjang S1 atau S2?";
      }

    } 
    // Untuk jurusan IMT / IT (Informatika)
    else if (/\b(imt|technology|it|informatika)\b/.test(userMessage)) {
      reply = "Hai! Jurusan IMT fokus ke software engineering & AI. Mau tahu syarat masuk atau info perkelasannya?";
    } 
    // Untuk keyword langsung IBM
    else if (/\b(ibm)\b/.test(userMessage)) {
      reply = "Halo! Buat International Business Management (IBM) S1, kita fokus ke entrepreneurship dan global business nih. Mau info tentang kurikulum atau beasiswanya?";
    } 
    // Untuk keyword langsung MEM
    else if (/\b(mem)\b/.test(userMessage)) {
      reply = "Halo! Buat S2 MEM (Master Executive Management), programnya cocok buat profesional & business owner. Mau info jadwal atau biayanya?";
    } 
    // Fallback jika tidak match sama sekali
    else {
      reply = "Hai! Maaf ya, aku agak kurang paham. Kamu lagi mau tanya info jurusan IBM (S1), IMT (S1), MEM (S2), atau pendaftaran maba?";
    }

    return res.status(200).json({ response_text: reply });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}