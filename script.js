// === KONFIGURACJA ===
const API_URL = "https://script.google.com/macros/s/AKfycbwQG81z6ODF-RESrreoQerMq07vnv5gDfopxYtnU_JN5dq03mPjA1LCc-MSWKNjO8aA/exec";

// Lista zawodników
const players = [
  { id: 1, name: "Franciszek Lubosik", birth: "2013" },
  { id: 2, name: "Karol Wawrzyniak", birth: "2010" },
  { id: 3, name: "Piotr Szastok", birth: "2010" },
  { id: 4, name: "Marcin Kalus", birth: "2011" },
  { id: 5, name: "Ksawery Jarzębak", birth: "2012" },
  { id: 6, name: "Nikodem Młoksiewicz", birth: "2013" },
  { id: 7, name: "Jakub Augustyniak", birth: "2013" },
  { id: 8, name: "Mateusz Bajger", birth: "2013" },
  { id: 9, name: "Miłosz Piotrowski", birth: "2013" },
  { id: 10, name: "Michał Musiolik", birth: "2011" },
  { id: 11, name: "Filip Solorz", birth: "2011" },
  { id: 12, name: "Filip Dąbrowski", birth: "2011" },
  { id: 13, name: "Dawid Hyczko-Wróblewski", birth: "2012" },
  { id: 14, name: "Jakub Białas", birth: "2010" },
  { id: 15, name: "Filip Hojka", birth: "2011" },
  { id: 16, name: "Patryk Twardoch", birth: "2012" },
  { id: 17, name: "Szymon Machtyk", birth: "2012" },
  { id: 18, name: "Filip Horzela", birth: "2013" },
  { id: 19, name: "Kacper Gajowski", birth: "2013" },
  { id: 20, name: "Wojciech Szudy", birth: "2010" },
  { id: 21, name: "Maciej Nehrebecki", birth: "2013" },
  { id: 22, name: "Miłosz Miller", birth: "2012" }
];

const playersBox = document.getElementById("players");
const dateInput = document.getElementById("date");

// Ustaw dzisiejszą datę
if (dateInput) dateInput.valueAsDate = new Date();

// Tworzenie listy zawodników
function renderPlayers() {
  playersBox.innerHTML = "";
  players.forEach(player => {
    const div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
      <span class="player-name">
        ${player.name} (${player.birth})
      </span>
      <input 
        type="checkbox" 
        class="attendance" 
        data-id="${player.id}"
        data-name="${player.name}"
        checked>
    `;
    playersBox.appendChild(div);
  });
}

renderPlayers();

// Zapis obecności
document.getElementById("saveBtn").addEventListener("click", () => {
  const attendance = [];

  document.querySelectorAll(".attendance").forEach(box => {
    attendance.push({
      date: dateInput.value,
      type: document.getElementById("type").value,
      id: parseInt(box.dataset.id),
      player: box.dataset.name,
      present: box.checked
    });
  });

  console.log("Zapisuję:", attendance);

  // Zapis lokalny
  localStorage.setItem("attendance", JSON.stringify(attendance));

  // Wysyłka do Google Sheets
    fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(attendance),
    mode: "no-cors"          // ← to omija CORS
  })
  .then(() => {
    alert("✅ Zapisano obecność! (wysłano do Google Sheets)");
  })
  .catch(error => {
    console.error("Błąd:", error);
    alert("✅ Prawdopodobnie zapisano (no-cors). Sprawdź arkusz Frekwencja.");
  });
});
