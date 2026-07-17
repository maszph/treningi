const API_URL = "https://script.google.com/macros/s/AKfycbztv1UfmeAoAdniHclDGJYRvHM1hYc1K1ouMG3wxtYe8_FBIWgSQ8zvI7Ko1I2oERe4/exec";

function loadStats() {
  const tableDiv = document.getElementById("statsTable");
  tableDiv.innerHTML = "<p>Ładowanie statystyk...</p>";

  // Pobieramy wszystkie zapisy z localStorage
  let allRecords = JSON.parse(localStorage.getItem("attendance") || "[]");

  const playerStats = {};

  allRecords.forEach(record => {
    const name = record.player;
    if (!name) return;

    if (!playerStats[name]) {
      playerStats[name] = { total: 0, present: 0 };
    }

    playerStats[name].total++;
    if (record.present === true) {
      playerStats[name].present++;
    }
  });

  if (Object.keys(playerStats).length === 0) {
    tableDiv.innerHTML = "<p>Brak zapisanych treningów jeszcze.</p>";
    return;
  }

  const sorted = Object.entries(playerStats)
    .sort((a, b) => (b[1].present / b[1].total) - (a[1].present / a[1].total));

  let html = `<h3>Frekwencja ogółem — ${Object.keys(playerStats).length} zawodników</h3>`;

  html += `
    <table style="width:100%; border-collapse:collapse; margin-top:15px;">
      <thead>
        <tr style="background:#1565c0; color:white;">
          <th style="padding:12px; text-align:left;">Zawodnik</th>
          <th style="padding:12px; text-align:center;">Liczba jednostek</th>
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
}

// Uruchom przy otwarciu
document.addEventListener("DOMContentLoaded", loadStats);
