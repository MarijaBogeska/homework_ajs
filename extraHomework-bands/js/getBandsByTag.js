import { setFilteredBands,getFilteredBands } from "./dataService.js";
import { pagination } from "./pagination.js";
import { allBands } from "./dataService.js";
import { showData } from "./showDataFnc.js";
export let getBandsByTag = (value) => {
    setFilteredBands(
      allBands().filter((band) => value === "" || band.tags.includes(value))
    );
    pagination.currentPage = 0;
    showData(pagination.currentPage)
  };