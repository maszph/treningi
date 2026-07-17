const API_URL = "https://script.google.com/macros/s/AKfycbzlUGO_wXKkDxARLX0RP3FJ2z3MAYzFdVNKxfLJiIWHhYLVrxH1v6aKJxW6zHVUYC_P/exec";

async function loadFullStats() {
  const tableDiv = document.getElementById("statsTable");
  tableDiv.innerHTML = "<p>Ładowanie pełnej historii...</p>";

  try {
    // Pobierz wszystkie rekordy z Sheets
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });

    const allRecords = await response.json();

    const playerStats = {};

    allRecords.forEach(record => {
      const name = record.Zawodnik || record.player;
      if (!name) return;

      if (!playerStats[name]) {
        playerStats[name] = { total: 0, present: 0 };
      }

      playerStats[name].total += 1;
      if (record.Obecny === "TAK" || record.present === true || record.present === "TAK") {
        playerStats[name].present += 1;
      }
    });

    // Sortowanie po frekwencji
    const sorted = Object.entries(playerStats)
      .sort((a, b) => (b[1].present / b[1].total) - (a[1].present / a[1].total));

    let html = `<h3>Frekwencja ogółem — ${Object.keys(playerStats).length} zawodników (${allRecords.length} wpisów)</h3>`;

    html += `
      <table style="width:100%; border-collapse:collapse; margin-top:15px;">
        <thead>
          <tr style="background:#1565c0; color:white;">
            <th style="padding:12px; text-align:left;">Zawodnik</th>
            <th style="padding:12px; text-align:center;">Jednostki</th>
            <th style="padding:12px; text-align:center;">Obecności</th>
            <th style="padding:12px; text-align:center;">Frekwencja</th>
          </tr>
        </thead>
        <tbody>`;

    sorted.forEach(([name, stats]) => {
      const percent = stats.total ? Math.round((stats.present / stats.total) * 100) : 0;
      const color = percent >= 85 ? '#2e7d32' : percent >= 70 ? '#f9a825' : '#d32f2f';
      html += `
        <tr>
          <td style="padding:12px; border-bottom:1px solid #eee;">${name}</td>
          <td style="text-align:center;padding:12px;border-bottom:1px solid #eee;">${stats.total}</td>
          <td style="text-align:center;padding:12px;border-bottom:1px solid #eee;">${stats.present}</td>
          <td style="text-align:center;padding:12px;border-bottom:1px solid #eee;font-weight:bold;color:${color};">${percent}%</td>
        </tr>`;
    });

    html += `</tbody></table>`;
    tableDiv.innerHTML = html;

  } catch (e) {
    console.error(e);
    tableDiv.innerHTML = `<p>Błąd pobierania z Sheets.<br>Używam lokalnych danych.</p>`;
    // fallback na localStorage
    const local = JSON.parse(localStorage.getItem("attendance") || "[]");
    // można tu dodać processRecords jeśli chcesz
  }
}

document.addEventListener("DOMContentLoaded", loadFullStats);
