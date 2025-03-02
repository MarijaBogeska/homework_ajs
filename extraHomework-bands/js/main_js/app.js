import { getData, setFilteredBands, getFilteredBands } from "../dataService.js";
import { tagsDropdown } from "../tagsDropDown.js";
import { updatePagination } from "../pagination.js";
import { showData } from "../showDataFnc.js";
import {
  searchSubmitOne,
  searchSubmitTwo,
  bandsBytagS1,
  bandsBytagS2,
  activeChekboxOne,
  activeChekboxTwo,
  prevBtn,
  nextBtn,
} from "../events.js";

const showBands = async () => {
  let allBands = await getData();
  setFilteredBands([...allBands]);
  updatePagination();
  tagsDropdown(getFilteredBands());
  showData(0);
};

showBands();

searchSubmitOne();
searchSubmitTwo();
bandsBytagS1();
bandsBytagS2();
activeChekboxOne();
activeChekboxTwo();
prevBtn();
nextBtn();
