const groups = {

Orlik:[
"Jan Kowalski",
"Adam Nowak",
"Piotr Wiśniewski",
"Michał Zieliński"
],

Młodzik:[
"Kacper Lis",
"Jakub Wójcik",
"Mateusz Kaczmarek",
"Filip Kamiński"
],

Junior:[
"Patryk Mazur",
"Oskar Lewandowski",
"Dominik Król",
"Maciej Pawlak"
]

};

const groupSelect=document.getElementById("group");

const playersDiv=document.getElementById("players");

const dateInput=document.getElementById("date");

dateInput.valueAsDate=new Date();

function showPlayers(){

playersDiv.innerHTML="";

const players=groups[groupSelect.value];

players.forEach(player=>{

const row=document.createElement("div");

row.className="player";

row.innerHTML=`

<label>${player}</label>

<input
type="checkbox"
class="attendance"
data-player="${player}"
checked>

`;

playersDiv.appendChild(row);

});

}

groupSelect.addEventListener("change",showPlayers);

showPlayers();

document
.getElementById("saveBtn")
.addEventListener("click",()=>{

const data=[];

document
.querySelectorAll(".attendance")
.forEach(box=>{

data.push({

group:groupSelect.value,

date:dateInput.value,

player:box.dataset.player,

present:box.checked

});

});

localStorage.setItem(
"attendance",
JSON.stringify(data)
);

alert("Obecność została zapisana lokalnie.");

console.log(data);

});
