import { sortBandsByAlbums, sortBandsByName } from "./sortingData.js";
import { getFilteredBands } from "./dataService.js";

//show table
export let showInfo = (data) => {
  let html =
    getFilteredBands().length === 0
      ? `<h3>No band found</h3>`
      : `<table>
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
  if (getFilteredBands().length !== 0) {
    let nameHeader = document.getElementById("name");
    let albumsHeader = document.getElementById("albums");
    // remove previous event listeners to prevent duplication
    nameHeader.replaceWith(nameHeader.cloneNode(true));
    albumsHeader.replaceWith(albumsHeader.cloneNode(true));
    // reattach event listeners
    nameHeader.addEventListener("click", () => {
      sortBandsByName();
    });
    albumsHeader.addEventListener("click", () => {
      sortBandsByAlbums();
    });
  }
};
