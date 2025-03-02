import { allBands } from "./dataService.js";

const uniqueTypes = new Set([...allBands()]);
export let showBand = (value) => {
  let band = allBands().find((band) => band.name === value);

  const albumTypeCounts= band.albums.reduce((acc, album) => {
    if (acc[album.type]) {
      acc[album.type]++;
    } else {
      acc[album.type] = 1;
    }
    return acc;
  }, []);

  let html = `<table>
  <tr>
        <th colspan="4" style="border:2px solid black; font-size:20px"><span>${band.name}</span></th>
  </tr>
    <tr>
        <th>Past Members</th>
        <th>Album summary</th>
        <th>Albums</th>
        <th>Years active</th>
    </tr>
    <tr>
      <td>
       ${band.members
         .filter((member) => member.former === true)
         .map((member) => `<ul>${member.name}</ul>`)
         .join("")}</td>
      <td>`;
      for (let type in albumTypeCounts) {
        html += `<ul>${type}: ${albumTypeCounts[type]}</ul>`;
      }
      html+=`</td>
      <td>
       ${band.albums
         .sort((a, b) => {
           return Number(a.year) - Number(b.year);
         })
         .map((album) => `<ul>${album.name}</ul>`)
         .join("")}
      </td>
      <td>
       ${band.albums
         .sort((a, b) => {
           return Number(a.year) - Number(b.year);
         })
         .map((album) => `<ul>${album.year}</ul>`)
         .join("")}
      </td>
      </tr>
      `;
  html += `</table>`;
  document.getElementById("content").innerHTML = html;
};
