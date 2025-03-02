import { getFilteredBands,setFilteredBands } from "./dataService.js";
import { pagination } from "./pagination.js";
import { allBands } from "./dataService.js";
import { showData } from "./showDataFnc.js";
export let getActiveBands = (isActive) => {
    setFilteredBands(isActive
        ? getFilteredBands().filter((band) => band.active)
        : [...allBands()],
     )
     pagination.currentPage = 0,
     showData(pagination.currentPage)
  };