let allProducts = [];

// Fetch API
fetch("https://fakestoreapi.com/products/")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    document.getElementById("status").innerText = "";
    populateCategories(data);
    displayProducts(data);
  })
  .catch(err => {
    document.getElementById("status").innerText = "Failed to load data";
    console.error(err);
  });

// Display products (separate function)
function displayProducts(data) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${product.title.substring(0, 50)}</h4>
      <img src="${product.image}" />
      <p>₹${product.price}</p>
      <p>${product.description.substring(0, 60)}...</p>
      <button onclick="viewMore('${product.title}', '${product.description}')">View More</button>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

// View more
function viewMore(title, description) {
  alert(title + "\\n\\n" + description);
}

// Search
document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

// Category filter
function populateCategories(data) {
  const categories = [...new Set(data.map(p => p.category))];
  const select = document.getElementById("categoryFilter");

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

document.getElementById("categoryFilter").addEventListener("change", function () {
  if (this.value === "all") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === this.value);
    displayProducts(filtered);
  }
});

// Sorting
document.getElementById("sort").addEventListener("change", function () {
  let sorted = [...allProducts];

  if (this.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (this.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
});

// Add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}