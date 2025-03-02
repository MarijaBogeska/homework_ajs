import { getData } from "../dataService.js";
import { bandsDropdown } from "../bandsDropdown.js";
import { setFilteredBands, getFilteredBands } from "../dataService.js";
import { updatePagination } from "../pagination.js";
import { prevBtn, nextBtn } from "../events.js";

// import { showData } from "../showDataFnc.js";
import { showBand } from "../displaySelectedBand.js";
import { showData } from "../showDataFnc.js";
const showBands = async () => {
  let allBands = await getData();
  setFilteredBands([...allBands]);
  updatePagination();
  bandsDropdown(getFilteredBands());
  // showData(0);
};

showBands();

document.getElementById("bandsDropdown").addEventListener("change", (e) => {
  e.preventDefault;
  if (e.target.value === "all") {
    showData();
    document.getElementById("pagination").style.display = "flex";
    prevBtn();
    nextBtn();
  } else {
    document.getElementById("pagination").style.display = "none";
    showBand(e.target.value);
  }
});
