const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

dateInput.value = `${year}-${month}-${day}`;

document.getElementById("startBtn").addEventListener("click", () => {

    const group = document.getElementById("group").value;

    const date = document.getElementById("date").value;

    alert(
`Grupa: ${group}

Data: ${date}

W następnym etapie pojawi się lista zawodników.`
);

});
