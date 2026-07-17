const API_URL = "https://script.google.com/macros/s/AKfycbxvW4pXblxkoWyI-kyXIVlnsrlzUpymo23a0LpSFXroC_gIGOsHZOaGQhTrc__kuueQ/exec";
let myChart = null;

async function loadFullStats() {
  const tableDiv = document.getElementById("statsTable");
  tableDiv.innerHTML = "<p>Ładowanie danych i generowanie wykresu...</p>";

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });

    const allRecords = await response.json();

    if (allRecords.error || !Array.isArray(allRecords)) {
      throw new Error(allRecords.error || "Błąd formatu danych");
    }

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

    // Sortowanie
    const sorted = Object.entries(playerStats)
      .sort((a, b) => (b[1].present / b[1].total) - (a[1].present / a[1].total));

    // Tabela
    let html = `<h3>Frekwencja ogółem — ${Object.keys(playerStats).length} zawodników (${allRecords.length} wpisów)</h3>`;

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

    // === WYKRES ===
    const labels = sorted.map(item => item[0].split(' ').slice(0,2).join(' ')); // skrócone imiona
    const percentages = sorted.map(item => Math.round((item[1].present / item[1].total) * 100));

    if (myChart) myChart.destroy();

    myChart = new Chart(document.getElementById("freqChart"), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Frekwencja %',
          data: percentages,
          backgroundColor: percentages.map(p => p >= 85 ? '#4caf50' : p >= 70 ? '#ff9800' : '#f44336'),
          borderColor: '#1565c0',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: { display: true, text: 'Frekwencja (%)' }
          }
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Frekwencja zawodników' }
        }
      }
    });

  } catch (e) {
    console.error("Błąd:", e);
    tableDiv.innerHTML = `<p>Błąd połączenia z Google Sheets.<br>Spróbuj odświeżyć stronę (Ctrl + Shift + R).</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadFullStats);
