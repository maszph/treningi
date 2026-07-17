const API_URL = "https://script.google.com/macros/s/AKfycbwQG81z6ODF-RESrreoQerMq07vnv5gDfopxYtnU_JN5dq03mPjA1LCc-MSWKNjO8aA/exec";

async function loadStatsFromSheets() {
  const tableDiv = document.getElementById("statsTable");
  tableDiv.innerHTML = "<p>Ładowanie danych...</p>";

  try {
    // Na razie pobieramy przez GET (trzeba dodać doPost lub nowy doGet w Apps Script)
    // Na tym etapie używamy localStorage + Sheets (prościej)
    const allAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");

    const playerStats = {};

    allAttendance.forEach(record => {
      const key = record.player;
      if (!playerStats[key]) {
        playerStats[key] = { total: 0, present: 0 };
      }
      playerStats[key].total++;
      if (record.present) playerStats[key].present++;
    });

    let html = `
      <table style="width:100%; border-collapse:collapse; margin-top:10px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="text-align:left; padding:12px;">Zawodnik</th>
            <th style="padding:12px;">Liczba jednostek</th>
            <th style="padding:12px;">Obecności</th>
            <th style="padding:12px;">Frekwencja</th>
          </tr>
        </thead>
        <tbody>
    `;

    Object.entries(playerStats)
      .sort((a, b) => (b[1].present / b[1].total) - (a[1].present / a[1].total))
      .forEach(([name, stats]) => {
        const percent = stats.total ? Math.round((stats.present / stats.total) * 100) : 0;
        html += `
          <tr>
            <td style="padding:12px; border-bottom:1px solid #eee;">${name}</td>
            <td style="text-align:center; padding:12px; border-bottom:1px solid #eee;">${stats.total}</td>
            <td style="text-align:center; padding:12px; border-bottom:1px solid #eee;">${stats.present}</td>
            <td style="text-align:center; padding:12px; border-bottom:1px solid #eee; font-weight:bold; color:${percent >= 85 ? '#2e7d32' : percent >= 70 ? '#f9a825' : '#d32f2f'};">${percent}%</td>
          </tr>
        `;
      });

    html += `</tbody></table>`;
    tableDiv.innerHTML = html;

  } catch (e) {
    tableDiv.innerHTML = "<p>Błąd ładowania danych.</p>";
    console.error(e);
  }
}

// Przycisk odśwież
document.getElementById("loadStatsBtn").addEventListener("click", loadStatsFromSheets);

// Ładuj przy otwarciu
loadStatsFromSheets();
