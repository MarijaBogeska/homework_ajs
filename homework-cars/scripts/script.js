let url =
  "https://raw.githubusercontent.com/MarijaBogeska/homework_ajs/refs/heads/main/homework-cars/scripts/cars.json";

let contents = {
  content: document.getElementById("table"),
  contentBarnd: document.getElementById("carBrand"),
  contentType: document.getElementById("carType"),
  contentGasType: document.getElementById("gasTypes"),
  contentColor: document.getElementById("colors"),
  showCarContent: document.getElementById("contentCars"),
};

let showCar = (data, content) => {
  let type = document.getElementById("carType").value.trim().toLowerCase();
  let brand = document.getElementById("carBrand").value.trim().toLowerCase();
  let model = document.getElementById("model").value.trim().toLowerCase();
  let doors = document.getElementById("doors").value.trim();
  let gasType = document.getElementById("gasTypes").value.trim().toLowerCase();
  let color = document.getElementById("colors").value.trim().toLowerCase();
  let isNew = document.querySelector('input[name="isNew"]:checked')?.value;
  let horsepowerUpto = document.getElementById("uptoValue").value.trim();

  doors = doors ? String(doors) : null;
  horsepowerUpto = horsepowerUpto ? Number(horsepowerUpto) : null;
  isNew = isNew !== undefined ? isNew === "true" : null;

  let cars = data.filter((x) => {
    return (
      (type === "" || x.type.toLowerCase() === type) &&
      (brand === "" || x.brand.toLowerCase() === brand) &&
      (model === "" || x.model.toLowerCase().includes(model)) &&
      (doors === null || x.doors.toString() === doors) &&
      (gasType === "" || x.gasType.toLowerCase() === gasType) &&
      (color === "" || x.color.toLowerCase() === color) &&
      (isNew === null || x.isNew === isNew) &&
      (horsepowerUpto === null || x.horsepower <= horsepowerUpto)
    );
  });

  content.innerHTML = "";
  if (cars.length === 0) {
    content.innerHTML = "No data found";
    content.style="color:orange;align-content: center; margin-left: 100px;font-size:25px"
  } else {
    showInfo(cars, content);
  }
};

let dropdowns = (data, filter, content) => {
  let arrayOfData = data
    .filter((x) => x[filter] !== null && x[filter] !== undefined)
    .map((x) => x[filter]);
  let uniqueArray = [...new Set(arrayOfData)];
  let html = `<option value="">select</option>`;
  for (let element of uniqueArray) {
    let option = `<option value="${element}">${element}</option>`;
    html += option;
  }
  content.innerHTML = html;
};

let showInfo = (data, content) => {
  let html = `<table>
    <tr>
        <th>Brand</th>
        <th>Type</th>
        <th>Model</th>
        <th>Horsepower</th>
        <th>Gas Type</th>
        <th>New</th>
        <th>Doors</th>
        <th>Color</th>
    </tr>
    `;
  for (let car of data) {
    let tr = `
         <tr>
        <td>${car.brand}</td>
        <td>${car.type}</td>
        <td>${car.model}</td>
        <td>${car.horsepower}</td>
        <td>${car.gasType}</td>
        <td>${car.isNew ? "Yes" : "No"}</td>
        <td>${car.doors}</td>
        <td>${car.color}</td>
    </tr>`;
    html += tr;
  }
  html += `</table>`;
  content.innerHTML = html;
};

let resetFilters = () => {
  contents.showCarContent.innerHTML = "";
  document.getElementById("filters").reset();
};
let getInfo = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // showInfo(data, contents.content);
      dropdowns(data, "type", contents.contentType);
      dropdowns(data, "brand", contents.contentBarnd);
      dropdowns(data, "gasType", contents.contentGasType);
      dropdowns(data, "color", contents.contentColor);
    });
};

let getCars = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showCar(data, contents.showCarContent);
    });
};

getInfo(url, contents.content);

document.getElementById("search").addEventListener("click", (event) => {
  event.preventDefault();
  getCars(url);
});

document.getElementById("reset").addEventListener("click", () => {
  resetFilters();
});
