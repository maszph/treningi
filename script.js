// Lista zawodników drużyny

const players = [

{
name:"Franciszek Lubosik",
birth:"2013"
},

{
name:"Karol Wawrzyniak",
birth:"2010"
},

{
name:"Piotr Szastok",
birth:"2010"
},

{
name:"Marcin Kalus",
birth:"2011"
},

{
name:"Ksawery Jarzębak",
birth:"2012"
},

{
name:"Nikodem Młoksiewicz",
birth:"2013"
},

{
name:"Jakub Augustyniak",
birth:"2013"
},

{
name:"Mateusz Bajger",
birth:"2013"
},

{
name:"Miłosz Piotrowski",
birth:"2013"
},

{
name:"Michał Musiolik",
birth:"2011"
},

{
name:"Filip Solorz",
birth:"2011"
},

{
name:"Filip Dąbrowski",
birth:"2011"
},

{
name:"Dawid Hyczko-Wróblewski",
birth:"2012"
},

{
name:"Jakub Białas",
birth:"2010"
},

{
name:"Filip Hojka",
birth:"2011"
},

{
name:"Patryk Twardoch",
birth:"2012"
},

{
name:"Szymon Machtyk",
birth:"2012"
},

{
name:"Filip Horzela",
birth:"2013"
},

{
name:"Kacper Gajowski",
birth:"2013"
},

{
name:"Wojciech Szudy",
birth:"2010"
},

{
name:"Maciej Nehrebecki",
birth:"2013"
},

{
name:"Miłosz Miller",
birth:"2012"
}

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
${player.name} (${player.birth})
</span>


<input 
type="checkbox"
class="attendance"
data-player="${player.name}"
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
