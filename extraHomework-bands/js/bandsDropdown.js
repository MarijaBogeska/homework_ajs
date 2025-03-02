export let bandsDropdown = (data) => {
    let bands = [...new Set(data.flatMap((band) => band.name))];
    let element = document.getElementById("bandsDropdown");
    let options =
      `<option value="">Bands</option>
      <option value="all">All Bands</option>
      ` +
      bands.map((name) => `<option value="${name}">${name}</option>`).join("");
    element.innerHTML = options;
  };