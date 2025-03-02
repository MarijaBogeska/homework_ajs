import { pagination, updatePagination } from "./pagination.js";
import { getFilteredBands } from "./dataService.js";
import { showInfo } from "./displayBands.js";

export let showData = (currentPage = 0) => {
    updatePagination();
    let bands = getFilteredBands().slice(currentPage * 5, (currentPage + 1) * 5);
    document.getElementById("currentPage").innerText = `${
      pagination.currentPage + 1
    }/${pagination.maxPages}`;
    showInfo(bands);
  };