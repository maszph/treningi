// Lista zawodników drużyny

const players = [

"Jan Kowalski",
"Adam Nowak",
"Piotr Wiśniewski",
"Michał Zieliński",
"Kacper Mazur",
"Jakub Wójcik",
"Filip Kamiński",
"Mateusz Pawlak"

];



const playersBox = document.getElementById("players");

const dateInput = document.getElementById("date");


// ustawienie dzisiejszej daty

dateInput.valueAsDate = new Date();



// tworzenie listy zawodników

players.forEach(player => {


const div = document.createElement("div");

div.className="player";


div.innerHTML = `

<span class="player-name">
${player}
</span>


<input 
type="checkbox"
class="attendance"
data-player="${player}"
checked
>


`;


playersBox.appendChild(div);


});





// zapis obecności

document
.getElementById("saveBtn")
.addEventListener("click",()=>{


const date = dateInput.value;

const type = document.getElementById("type").value;



const attendance=[];



document
.querySelectorAll(".attendance")
.forEach(box=>{


attendance.push({

date:date,

type:type,

player:box.dataset.player,

present:box.checked


});


});



console.log(attendance);



localStorage.setItem(

"attendance",

JSON.stringify(attendance)

);



alert(

"Zapisano obecność!"

);


});
