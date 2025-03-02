export let tagsDropdown = (data) => {
    let uniqueTags = [...new Set(data.flatMap((band) => band.tags))];
    let element = document.getElementById("tags");
    let element1 = document.getElementById("tags1");
    let options =
      `<option value="">Tags</option>` +
      uniqueTags.map((tag) => `<option value="${tag}">${tag}</option>`).join("");
    element.innerHTML = options;
    element1.innerHTML = options;
  };