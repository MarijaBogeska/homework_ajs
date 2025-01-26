let showInfo = (data) => {
  let table = document.getElementById("table");
  let html = `<table>
            <tr>
                <th>Planet Name</th>
                <th>Population</th>
                <th>Climate</th>
                <th>Gravity</th>
            </tr>
       `;
  for (let planet of data.results) {
    let td = `
    <tr>
        <td>${planet.name}</td>
        <td>${planet.population}</td>
        <td>${planet.climate}</td>
        <td>${planet.gravity}</td>
    </tr>`;
    html += td;
  }
  html += `</table>`;
  table.innerHTML = html;
};

let getInfo = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showInfo(data);
    });
};

document.getElementById("show").addEventListener("click", () => {
  getInfo("https://swapi.py4e.com/api/planets/?page=1");
  document.getElementById("show").disabled = true;
  document.getElementById("next").style.display = "block";
});

document.getElementById("next").addEventListener("click", () => {
  getInfo("https://swapi.py4e.com/api/planets/?page=2");
  document.getElementById("next").style.display = "none";
  document.getElementById("previous").style.display = "block";
});

document.getElementById("previous").addEventListener("click", () => {
  getInfo("https://swapi.py4e.com/api/planets/?page=1");
  document.getElementById("next").style.display = "block";
  document.getElementById("previous").style.display = "none";
});
