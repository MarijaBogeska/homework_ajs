import { getFilteredBands } from "./dataService.js";
import { pagination } from "./pagination.js";
import { showData } from "./showDataFnc.js";

let ascending = true;
let descending = true;

export let sortBandsByName = () => {
  getFilteredBands().sort((a, b) =>
    ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  ascending = !ascending;
  showData(pagination.currentPage);
};

export let sortBandsByAlbums = () => {
  getFilteredBands().sort((a, b) =>
    descending
      ? b.albums.length - a.albums.length
      : a.albums.length - b.albums.length
  );
  descending = !descending;
  showData(pagination.currentPage);
};
