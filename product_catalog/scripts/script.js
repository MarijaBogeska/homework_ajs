const urls = {
  category: "https://fakestoreapi.com/products/categories",
  allProducts: "https://fakestoreapi.com/products",
  productsByCategory: "https://fakestoreapi.com/products/category/",
};
let pageSizes = [3, 6, 9];
let pageSize = 6;
let cartProducst = [];
let arrayId = [];
let pagination = {
  totalItems: 0,
  maxPages: 0,
  currentPage: 0,
  chosenCategory: null,
};
let filterDiv = document.getElementById("filters");
let productsMainDiv = document.getElementById("products");
let categoryHeader = document.getElementById("category-title");
let productsDiv = document.getElementById("show-products");
let addToCartDiv = document.getElementById("itemsInCart");

// get all categories

function getAllCategories() {
  fetch(urls.category)
    .then((response) => response.json())
    .then((data) => {
      showCategoriesDropDown(data);
    });
}
//page=current page pageSize= page size
function getAllProducts(page, pageSize1) {
  fetch(urls.allProducts)
    .then((res) => res.json())
    .then((products) => {
      pagination.totalItems = products.length;
      pagination.maxPages = Math.ceil(pagination.totalItems / pageSize);
      let newProducts = products.splice(page * pageSize1, pageSize1);
      let currentPageNumbers = (document.getElementById(
        "currentPage"
      ).innerHTML = `${pagination.currentPage + 1}/${pagination.maxPages}`);
      showProducts(newProducts);
    });
}

function getProductsByCategory(page, pageSize1, category) {
  fetch(`${urls.productsByCategory}${category}`)
    .then((res) => res.json())
    .then((products) => {
      pagination.totalItems = products.length;
      pagination.maxPages = Math.ceil(pagination.totalItems / pageSize);
      let newProducts = products.splice(page * pageSize1, pageSize1);
      let currentPageNumbers = (document.getElementById(
        "currentPage"
      ).innerHTML = `${pagination.currentPage + 1}/${pagination.maxPages}`);
      showProducts(newProducts);
    });
}

function addCartEventListeners() {
  let cartBtns = document.querySelectorAll(".cart");
  for (let btn of cartBtns) {
    btn.addEventListener("click", (e) => {
      arrayId = [
        ...new Set([...arrayId, e.target.getAttribute("data-product-id")]),
      ];
    });
  }
}
function showAddToCart(ids) {
  fetch(urls.allProducts)
    .then((res) => res.json())
    .then((data) => {
      let filter = data.filter((x) => ids.includes(x.id.toString()));
      let html = `<h1 id="cart">Cart</h1>`;
      filter.forEach((product) => {
        html += `<div class="card mb-3" style="max-width: 540px;">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${product.image}"  class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Price: ${product.price} $</p>
                      </div>
                      <div id="removeItem">
                        <button name="removeBtn" class="btn btn-primary cart" data-product-id='${product.id}'>Remove</button>
                      </div>
                    </div>
                   </div>
                 </div>`;
      });
      let sum = 0;
      filter.forEach((element) => {
        sum += Number(`${element.price}`);
      });
      html += `<div id="totalPriceDiv">
      <p>Total price: ${sum}$</p>
      <button id="makePurchaseBtn" class="btn btn-primary cart" ${
        sum !== 0 ? "" : "disabled"
      }>Make Purchase</button>
      </div>`;
      addToCartDiv.innerHTML = html;

      document
        .getElementById("makePurchaseBtn")
        .addEventListener("click", () => {
          arrayId = [];
          showAddToCart(arrayId);
          filterDiv.style.display = "block";
          productsMainDiv.style.display = "block";
          addToCartDiv.style.display = "none";
        });
    });
}
// getAllProducts();
function showCategoriesDropDown(data) {
  let btn = `<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Categories</button>`;
  let ul = '<ul class="dropdown-menu">';
  for (let category of data) {
    let li = `<li><button name='category' class="dropdown-item" value="${category}">${category}</button></li>`;
    ul += li;
  }
  ul += "</ul>";
  let html = `<div class="dropdown">
        ${btn} ${ul}
    </div>`;
  document.getElementById("category-filter").innerHTML = html;
}
function showProducts(products) {
  let html = ``;
  for (let product of products) {
    let card = `<div class="card" style="width: 25rem;">
                <img src="${product.image}" class="card-img-top" alt="..." style="width: 100%; height: 20rem; object-fit: contain;">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">Price: ${product.price} $</p>
                  <button class="btn btn-primary cart" data-product-id='${product.id}'>Add to cart</button>
                </div>
              </div>`;
    html += card;
  }
  productsDiv.innerHTML = html;
  addCartEventListeners();
}
function getProductInCart() {
  addCartEventListeners();
}
function showProductInCart() {}
function dropdownPageSize() {
  let content = document.getElementById("pageSize");
  let html = "";
  for (let i of pageSizes) {
    html += `<option ${
      i === pageSize ? "selected" : ""
    } value="${i}">${i}</option>`;
  }
  content.innerHTML = html;
}
dropdownPageSize();
getAllCategories();
//
document.getElementById("category-filter").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.name === "category") {
    pagination.chosenCategory = e.target.value;
    categoryHeader.innerText = `Category: ${pagination.chosenCategory}`;
    pageSize = 6;
    document.getElementById("pageSize").options[1].selected = true;
    pagination.currentPage = 0;
    getProductsByCategory(
      pagination.currentPage,
      pageSize,
      pagination.chosenCategory
    );
  }
});

document.getElementById("products-nav").addEventListener("click", () => {
  filterDiv.style.display = "block";
  addToCartDiv.style.display = "none";
  productsMainDiv.style.display = "block";
  categoryHeader.innerText = "All Products";
  pagination.currentPage = 0;
  getAllProducts(pagination.currentPage, pageSize);
});

document.getElementById("pageSize").addEventListener("change", (e) => {
  pageSize = e.target.value;
  pagination.currentPage = 0;
  pagination.chosenCategory
    ? getProductsByCategory(
        pagination.currentPage,
        pageSize,
        pagination.chosenCategory
      )
    : getAllProducts(pagination.currentPage, pageSize);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  if (pagination.currentPage > 0) {
    pagination.currentPage -= 1;
    pagination.chosenCategory
      ? getProductsByCategory(
          pagination.currentPage,
          pageSize,
          pagination.chosenCategory
        )
      : getAllProducts(pagination.currentPage, pageSize);
  }
});
document.getElementById("nextBtn").addEventListener("click", () => {
  if (pagination.currentPage !== pagination.maxPages - 1) {
    pagination.currentPage += 1;
    pagination.chosenCategory
      ? getProductsByCategory(
          pagination.currentPage,
          pageSize,
          pagination.chosenCategory
        )
      : getAllProducts(pagination.currentPage, pageSize);
  }
});

document.getElementById("shopCart").addEventListener("click", () => {
  filterDiv.style.display = "none";
  productsMainDiv.style.display = "none";
  addToCartDiv.style.display = "block";
  showAddToCart(arrayId);
});

document.getElementById("itemsInCart").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.name === "removeBtn") {
    arrayId = arrayId.filter(
      (x) => x !== e.target.getAttribute("data-product-id")
    );
    showAddToCart(arrayId);
  }
});
