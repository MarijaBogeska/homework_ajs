import { getBands } from "./searchBands.js";
import { getBandsByTag } from "./getBandsByTag.js";
import { getActiveBands } from "./activeBands.js";
import { pagination } from "./pagination.js";
import { showData } from "./showDataFnc.js";
//serch buttons
const searchSubmitOne = () => {
  document.getElementById("submitBtn").addEventListener("click", (event) => {
    event.preventDefault();
    let element = document.getElementById("searchName");
    getBands(element);
    element.value = "";
  });
};

const searchSubmitTwo = () => {
  document.getElementById("submitBtn1").addEventListener("click", (event) => {
    event.preventDefault();
    let element = document.getElementById("searchName1");
    getBands(element);
    element.value = "";
  });
};

// tags dropdown
const bandsBytagS1 = () => {
  document.getElementById("tags").addEventListener("change", (event) => {
    getBandsByTag(event.target.value);
  });
};
const bandsBytagS2 = () => {
  document.getElementById("tags1").addEventListener("change", (event) => {
    getBandsByTag(event.target.value);
  });
};

// active bands-checkbox
const activeChekboxOne = () => {
  document.getElementById("activeBands").addEventListener("change", (event) => {
    getActiveBands(event.target.checked);
  });
};
const activeChekboxTwo = () => {
  document
    .getElementById("activeBands1")
    .addEventListener("change", (event) => {
      getActiveBands(event.target.checked);
    });
};

// pagination controls
const scrollToContent = () => {
  window.scrollTo({
    top: document.getElementById("content").offsetTop,
    behavior: "smooth",
  });
};
let prevBtn = () => {
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (pagination.currentPage > 0) {
      pagination.currentPage--;
      showData(pagination.currentPage);
      scrollToContent();
    }
  });
};

let nextBtn = () => {
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (pagination.currentPage < pagination.maxPages - 1) {
      pagination.currentPage++;
      showData(pagination.currentPage);
      scrollToContent();
    }
  });
};

export {
  searchSubmitOne,
  searchSubmitTwo,
  bandsBytagS1,
  bandsBytagS2,
  activeChekboxOne,
  activeChekboxTwo,
  prevBtn,
  nextBtn,
};
