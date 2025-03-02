import { getFilteredBands } from "./dataService.js";

export let pagination = {
    currentPage: 0,
    maxPages: 0,
    totalBands: 0,
  };

  export const updatePagination = () => {
    let filteredBands = getFilteredBands();
    pagination.totalBands = filteredBands.length;
    pagination.maxPages = Math.ceil(pagination.totalBands / 5);
  };