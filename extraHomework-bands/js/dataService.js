const url =
  "https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json";

let bands = [];
let filteredBands = [];
export const getData = async () => {
  if (bands.length > 0) return bands;
  try {
    let response = await fetch(url);
    bands = await response.json();
    console.log("Bands fetched:", bands);
    return bands;
  } catch (error) {
    console.error("Error fetching bands:", error);
    return [];
  }
};

export let getFilteredBands = () => filteredBands;
export let setFilteredBands = (newFilteredBands) => {
  filteredBands = newFilteredBands;
};
export const allBands = ()=>bands;
