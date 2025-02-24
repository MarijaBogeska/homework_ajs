const url =
  "https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json";

let ascending = true;
let descending = true;
let pagination = {
  currentPage: 0,
  maxPages: 0,
  totalBands: 0,
};
let allBands = [];
let filteredBands = [];

//fetch data
let getData = async () => {
  if (allBands.length > 0) return;
  let response = await fetch(url);
  let data = await response.json();
  allBands = data;
  filteredBands = [...allBands];
  pagination.totalBands = filteredBands.length;
  pagination.maxPages = Math.ceil(pagination.totalBands / 5);
  tagsDropdown(filteredBands);
  getInfo(0);
};

// display data
let getInfo = (currentPage = 0) => {
  pagination.totalBands = filteredBands.length;
  pagination.maxPages = Math.ceil(pagination.totalBands / 5);
  let bands = filteredBands.slice(currentPage * 5, (currentPage + 1) * 5);
  document.getElementById("currentPage").innerText = `${
    pagination.currentPage + 1
  }/${pagination.maxPages}`;
  showInfo(bands);
};

// show table
let showInfo = (data) => {
  let html = `<table>
    <tr>
        <th id="name" style="cursor: pointer;">Name</th>
        <th>Tags</th>
        <th>Members</th>
        <th id="albums" style="cursor: pointer;">Number of albums</th>
    </tr>`;

  data.forEach((band) => {
    html += `<tr>
      <td>`;
    if (band.active === true) {
      html += `<span class="dot"></span>`;
    }
    html += ` ${band.name}</td>
      <td>${band.tags.join(", ")}</td>
      <td>${band.members
        .map((member) => `<ul>${member.name}</ul>`)
        .join("")}</td>
      <td>${band.albums.length || 0}</td> 
    </tr>`;
  });

  html += `</table>`;
  document.getElementById("content").innerHTML = html;

  // sorting data
  document.getElementById("name").addEventListener("click", () => {
    sortBandsByName();
  });
  document.getElementById("albums").addEventListener("click", () => {
    sortBandsByAlbums();
  });
};

// sorting fnc
let sortBandsByName = () => {
  filteredBands.sort((a, b) =>
    ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  ascending = !ascending;
  getInfo(pagination.currentPage);
};

let sortBandsByAlbums = () => {
  filteredBands.sort((a, b) =>
    descending
      ? b.albums.length - a.albums.length
      : a.albums.length - b.albums.length
  );
  descending = !descending;
  getInfo(pagination.currentPage);
};

// display dropdown
let tagsDropdown = (data) => {
  let uniqueTags = [...new Set(data.flatMap((band) => band.tags))];
  let element = document.getElementById("tags");
  let element1 = document.getElementById("tags1");
  let options =
    `<option value="">Tags</option>` +
    uniqueTags.map((tag) => `<option value="${tag}">${tag}</option>`).join("");
  element.innerHTML = options;
  element1.innerHTML = options;
};

// display bands by tag
let getBandsByTag = (value) => {
  filteredBands = allBands.filter(
    (band) => value === "" || band.tags.includes(value)
  );
  pagination.currentPage = 0;
  getInfo(0);
};

// search fnc
let getBands = (element) => {
  let searchName = element.value.trim().toLowerCase();
  filteredBands = allBands.filter(
    (band) => searchName === "" || band.name.toLowerCase().includes(searchName)
  );
  pagination.currentPage = 0;
  getInfo(0);
};

// show active bands
let getActiveBands = (isActive) => {
  filteredBands = isActive
    ? allBands.filter((band) => band.active)
    : [...allBands];
  pagination.currentPage = 0;
  getInfo(0);
};

// event listeners
document.getElementById("submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let element = document.getElementById("searchName");
  getBands(element);
  element.value = "";
});

document.getElementById("submitBtn1").addEventListener("click", (event) => {
  event.preventDefault();
  let element = document.getElementById("searchName1");
  getBands(element);
  element.value = "";
});

// tags dropdown
document.getElementById("tags").addEventListener("change", (event) => {
  getBandsByTag(event.target.value);
});
document.getElementById("tags1").addEventListener("change", (event) => {
  getBandsByTag(event.target.value);
});

// active bands-checkbox
document.getElementById("activeBands").addEventListener("change", (event) => {
  getActiveBands(event.target.checked);
});
document.getElementById("activeBands1").addEventListener("change", (event) => {
  getActiveBands(event.target.checked);
});

// pagination controls
document.getElementById("prevBtn").addEventListener("click", () => {
  if (pagination.currentPage > 0) {
    pagination.currentPage--;
    getInfo(pagination.currentPage);
    window.scrollTo({
      top: document.getElementById("content").offsetTop,
      behavior: "smooth",
    });
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (pagination.currentPage < pagination.maxPages - 1) {
    pagination.currentPage++;
    getInfo(pagination.currentPage);
    window.scrollTo({
      top: document.getElementById("content").offsetTop,
      behavior: "smooth",
    });
  }
});

//data load
getData();
