const WHATSAPP_NUMBER = "59168294053";

const products = [
  {
    name: "Ollas resistentes",
    category: "Cocina",
    image: "assets/img/producto-01.jpg",
    description: "Ollas prácticas y resistentes para el uso diario en casa."
  },
  {
    name: "Termos de calidad",
    category: "Termos",
    image: "assets/img/producto-02.jpg",
    description: "Termos útiles para mantener tus bebidas por más tiempo."
  },
  {
    name: "Platos y vajilla",
    category: "Vajilla",
    image: "assets/img/producto-03.jpg",
    description: "Vajilla para tu mesa, reuniones familiares y uso diario."
  },
  {
    name: "Tostadoras",
    category: "Electrodomésticos",
    image: "assets/img/producto-04.jpg",
    description: "Electrodomésticos prácticos para equipar tu cocina."
  },
  {
    name: "Cocinas pequeñas",
    category: "Electrodomésticos",
    image: "assets/img/producto-05.jpg",
    description: "Soluciones compactas para preparar tus comidas."
  },
  {
    name: "Secadoras",
    category: "Electrodomésticos",
    image: "assets/img/producto-06.jpg",
    description: "Productos que aportan comodidad a tu hogar."
  },
  {
    name: "Vasos y jarras",
    category: "Hogar",
    image: "assets/img/producto-07.jpg",
    description: "Productos prácticos para el día a día de tu familia."
  },
  {
    name: "Utensilios de cocina",
    category: "Utensilios",
    image: "assets/img/producto-08.jpg",
    description: "Variedad de utensilios para preparar tus alimentos."
  },
  {
    name: "Sartenes",
    category: "Cocina",
    image: "assets/img/producto-09.jpg",
    description: "Sartenes para cocinar con comodidad y estilo."
  },
  {
    name: "Productos para el hogar",
    category: "Hogar",
    image: "assets/img/producto-10.jpg",
    description: "Encuentra variedad de artículos para equipar tu hogar."
  }
];

const productGrid = document.getElementById("productGrid");
const filters = document.getElementById("filters");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

function whatsappLink(productName) {
  const message = `Hola, quiero más información sobre este producto: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts(category = "Todos") {
  productGrid.innerHTML = "";
  const filtered = category === "Todos" ? products : products.filter(p => p.category === category);

  filtered.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card section-reveal";
    card.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="category-badge">${product.category}</span>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a class="btn whatsapp-btn" href="${whatsappLink(product.name)}" target="_blank" rel="noreferrer">Más información</a>
      </div>
    `;
    productGrid.appendChild(card);
  });

  observeReveal();
}

function renderFilters() {
  const categories = ["Todos", ...new Set(products.map(product => product.category))];
  filters.innerHTML = "";

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${category === "Todos" ? "active" : ""}`;
    btn.textContent = category;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(category);
    });
    filters.appendChild(btn);
  });
}

function observeReveal() {
  const revealItems = document.querySelectorAll(".section-reveal:not(.visible)");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
}

function drawHomeCanvas() {
  const canvas = document.getElementById("homeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let t = 0;

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const grd = ctx.createLinearGradient(0, 0, w, h);
    grd.addColorStop(0, "#faf6ec");
    grd.addColorStop(1, "#ffffff");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // decorative circle
    ctx.beginPath();
    ctx.arc(360, 60, 110, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(190, 143, 48, 0.16)";
    ctx.fill();

    // house base
    ctx.strokeStyle = "#0b233c";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(115, 175);
    ctx.lineTo(230, 80);
    ctx.lineTo(345, 175);
    ctx.stroke();

    ctx.strokeStyle = "#be8f30";
    ctx.strokeRect(150, 175, 160, 90);
    ctx.strokeRect(215, 210, 35, 55);

    // little products
    ctx.fillStyle = "#0b233c";
    ctx.fillRect(75, 225, 42, 40);
    ctx.fillStyle = "#be8f30";
    ctx.fillRect(335, 218, 42, 47);

    // animated dot
    ctx.beginPath();
    ctx.arc(70 + Math.sin(t) * 18, 70 + Math.cos(t) * 10, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#be8f30";
    ctx.fill();

    ctx.fillStyle = "#0b233c";
    ctx.font = "bold 22px Arial";
    ctx.fillText("Todo para tu Hogar", 118, 36);

    t += 0.035;
    requestAnimationFrame(draw);
  }

  draw();
}

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("active"));
});

renderFilters();
renderProducts();
observeReveal();
drawHomeCanvas();
