import { pagination} from "./pagination.js";
import { getData,setFilteredBands} from "./dataService.js";
import { showData } from "./showDataFnc.js";
const allBands = await getData();

export let getBands = (element) => {
    let searchName = element.value.trim().toLowerCase();
    setFilteredBands(allBands.filter(
      (band) => searchName === "" || band.name.toLowerCase().includes(searchName)
    ));
    pagination.currentPage = 0;
    showData(pagination.currentPage)
  };