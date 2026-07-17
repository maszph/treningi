const API_URL = "https://script.google.com/macros/s/AKfycbwQG81z6ODF-RESrreoQerMq07vnv5gDfopxYtnU_JN5dq03mPjA1LCc-MSWKNjO8aA/exec";

// Ładujemy dane z localStorage na razie (później z Sheets)
function loadStats() {
  const allAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
  
  const playerStats = {};

  allAttendance.forEach(record => {
    const key = record.player;
    if (!playerStats[key]) {
      playerStats[key] = { total: 0, present: 0, id: record.id };
    }
    playerStats[key].total++;
    if (record.present) playerStats[key].present++;
  });

  const tableHTML = `
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left; padding:10px; border-bottom:2px solid #ddd;">Zawodnik</th>
          <th style="padding:10px; border-bottom:2px solid #ddd;">Treningi</th>
          <th style="padding:10px; border-bottom:2px solid #ddd;">Obecny</th>
          <th style="padding:10px; border-bottom:2px solid #ddd;">Frekwencja</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(playerStats).map(([name, stats]) => {
          const percent = stats.total ? Math.round((stats.present / stats.total) * 100) : 0;
          return `
            <tr>
              <td style="padding:10px; border-bottom:1px solid #eee;">${name}</td>
              <td style="text-align:center; padding:10px; border-bottom:1px solid #eee;">${stats.total}</td>
              <td style="text-align:center; padding:10px; border-bottom:1px solid #eee;">${stats.present}</td>
              <td style="text-align:center; padding:10px; border-bottom:1px solid #eee; font-weight:bold; color:${percent > 80 ? 'green' : percent > 60 ? 'orange' : 'red'};">${percent}%</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  document.getElementById("statsTable").innerHTML = tableHTML;
}

loadStats();
