const TNDATA = [
   {
      district: "Thanjavur",
      taluks: [
         { name: "Papanasam", villages: ["Ayyampettai", "Pandalgudi", "Thiruvaiyaru"] },
         { name: "Kumbakonam", villages: ["Darasuram", "Swamimalai", "Govindapuram"] },
         { name: "Thiruvaiyaru", villages: ["Melattur", "Marudur", "Thirupazhanam"] }
      ]
   },
   {
      district: "Tirunelveli",
      taluks: [
         { name: "Ambasamudram", villages: ["Kallidaikurichi", "Cheranmahadevi", "Pudupatti"] },
         { name: "Tenkasi", villages: ["Alangulam", "Sivagiri", "V.K Puram"] }
      ]
   },
   {
      district: "Madurai",
      taluks: [
         { name: "Melur", villages: ["Mudukulathur", "Vilangudi", "Melur South"] },
         { name: "Vadipatti", villages: ["Vadipatti", "Samayanallur", "Othakadai"] }
      ]
   },
   {
      district: "Coimbatore",
      taluks: [
         { name: "Pollachi", villages: ["Anaimalai", "Vettaikaranpudur", "Udumalpet Road"] },
         { name: "Mettupalayam", villages: ["Karamadai", "Sirumugai", "Odanthurai"] }
      ]
   }
];
// Market Price Dataset (₹ per kg)
const MARKET_PRICES = [
   { crop: "Paddy", price: 32 },
   { crop: "Tomato", price: 18 },
   { crop: "Onion", price: 27 },
   { crop: "Chilli", price: 135 }
];

// Weather Advisory (general + crop-specific)
const WEATHER_ADVISORY = [
   {
      crop: "Paddy",
      best_season: "June - December",
      notes: "Requires warm climate with moderate rainfall. Ideal temperature is 20°C - 35°C. Maintain standing water during vegetative growth phase."
   },
   {
      crop: "Tomato",
      best_season: "September - January",
      notes: "Requires well-drained soil and moderate temperature (20°C - 28°C). Avoid heavy rains during flowering."
   },
   {
      crop: "Onion",
      best_season: "November - March",
      notes: "Prefers dry weather with temperature 13°C - 24°C. Avoid waterlogging as bulbs rot easily."
   },
   {
      crop: "Chilli",
      best_season: "July - November",
      notes: "Requires warm humid climate (20°C - 30°C). Sensitive to frost and waterlogging."
   }
];
// Paddy Varieties (South India Focus)
const PADDY_VARIETIES = [
   {
      state: "Tamil Nadu",
      varieties: [
         { name: "ADT-36", duration: "115-120 days", type: "Medium-duration", suitable: "Delta areas" },
         { name: "ADT-47", duration: "110 days", type: "Short-duration", suitable: "Thanjavur, Trichy belts" },
         { name: "CO-43", duration: "130 days", type: "Traditional medium", suitable: "Cauvery delta" },
         { name: "CO-51", duration: "110 days", type: "Short-duration", suitable: "Saline soils" },
         { name: "IR-50", duration: "105-110 days", type: "High yielding", suitable: "Tank-fed areas" },
         { name: "Ponni", duration: "135-140 days", type: "Popular edible rice", suitable: "Tamil Nadu river belts" },
         { name: "Seeraga Samba", duration: "135-140 days", type: "Premium aromatic", suitable: "Thanjavur-Thiruvaiyaru region" }
      ]
   },
   {
      state: "Andhra Pradesh / Telangana",
      varieties: [
         { name: "Sona Masuri", duration: "135 days", type: "Premium edible", suitable: "Irrigated zones" },
         { name: "MTU-1010", duration: "120-125 days", type: "High yielding", suitable: "Canal irrigated regions" },
         { name: "Swarna", duration: "140 days", type: "Long duration", suitable: "Delta areas" }
      ]
   },
   {
      state: "Kerala",
      varieties: [
         { name: "Matta Rice", duration: "150 days", type: "Coarse red rice", suitable: "Palakkad plains" },
         { name: "Uma", duration: "120-130 days", type: "Medium duration", suitable: "Rain-fed regions" },
         { name: "Jaya", duration: "135 days", type: "High yielding", suitable: "Paddy-wetlands" }
      ]
   },
   {
      state: "Karnataka",
      varieties: [
         { name: "Rajamudi", duration: "150 days", type: "Heritage red rice", suitable: "Mysore region" },
         { name: "Gandhakasala", duration: "130 days", type: "Aromatic fine rice", suitable: "Malnad region" },
         { name: "Rakthashali", duration: "160 days", type: "Medicinal red rice", suitable: "Rain-fed zones" }
      ]
   }
];
// Agricultural Schemes Dataset
const SCHEMES = [
   {
      name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      type: "Central Scheme",
      benefit: "₹6000 per year direct income support",
      eligibility: "Small and marginal farmers owning cultivable land",
      link: "https://pmkisan.gov.in/"
   },
   {
      name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      type: "Central Scheme",
      benefit: "Crop insurance against natural calamities, pests, diseases",
      eligibility: "All eligible farmers growing notified crops",
      link: "https://pmfby.gov.in/"
   },
   {
      name: "Soil Health Card",
      type: "Central Scheme",
      benefit: "Soil nutrient analysis for fertilizer recommendations",
      eligibility: "Farmers engaged in cultivation",
      link: "https://soilhealth.dac.gov.in/"
   },
   {
      name: "TN - Uzhavan App Integration",
      type: "Tamil Nadu State Scheme",
      benefit: "Agri services, market price, subsidy info, crop advisory",
      eligibility: "Farmers registered through Uzhavan app",
      link: "https://www.tn.gov.in/"
   },
   {
      name: "TN - Agricultural Mechanization Subsidy",
      type: "Tamil Nadu State Subsidy",
      benefit: "Subsidy for tractors, power tillers, implements",
      eligibility: "Registered farmers with land records",
      link: "https://www.tnagrisubsidy.in/"
   },
   {
      name: "TN - Micro Irrigation Subsidy",
      type: "Tamil Nadu State Scheme",
      benefit: "Drip and sprinkler irrigation subsidy",
      eligibility: "Farmers cultivating horticulture crops",
      link: "https://tnhorticulture.tn.gov.in/"
   }
];
// LOCAL STORAGE KEYS
const FARMER_KEY = "farmers";
const STOCK_KEY = "stocks";

// Get data or initialize
function getFarmers() {
   return JSON.parse(localStorage.getItem(FARMER_KEY)) || [];
}

function getStocks() {
   return JSON.parse(localStorage.getItem(STOCK_KEY)) || [];
}

// Save farmer
function saveFarmer() {
   const name = document.getElementById("reg-name").value;
   const district = document.getElementById("reg-district").value;
   const taluk = document.getElementById("reg-taluk").value;
   const village = document.getElementById("reg-village").value;
   if (!name || !district || !taluk || !village) {
      alert("Fill all fields");
      return;
   }
   const farmerId = "F" + Date.now(); // unique ID
   const farmer = {
      id: farmerId,
      name,
      district,
      taluk,
      village
   };
   const farmers = getFarmers();
   farmers.push(farmer);
   localStorage.setItem(FARMER_KEY, JSON.stringify(farmers));
   // store current logged farmer
   localStorage.setItem("current_farmer_id", farmerId);
   alert("Farmer Registered Successfully");
   openScreen("screen-farmer-dashboard");
}

// Save stock
function saveStock() {

   const crop = document.getElementById("stock-crop").value;
   const qty = document.getElementById("stock-qty").value;
   const unit = document.getElementById("stock-unit").value;
   const price = document.getElementById("stock-price").value;

   if (!qty || !price) {
      alert("Enter quantity and price");
      return;
   }

   const farmerId = localStorage.getItem("current_farmer_id");
   const farmers = getFarmers();
   const farmer = farmers.find(f => f.id === farmerId);

   if (!farmer) {
      alert("Farmer not found");
      return;
   }

   const stock = {
      id: "S" + Date.now(),
      farmerId,
      crop,
      qty: Number(qty),
      unit,
      price: Number(price),
      district: farmer.district,
      taluk: farmer.taluk,
      village: farmer.village,
      name: farmer.name,
      status: "available",
      createdAt: Date.now()
   };

   const stocks = getStocks();
   stocks.push(stock);

   localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));

   alert("Stock Added Successfully");
   openScreen("screen-farmer-dashboard");
}

// Render farmer stock
function loadMyStock() {

   const farmerId = localStorage.getItem("current_farmer_id");
   const list = document.getElementById("my-stock-list");

   list.innerHTML = "";

   const stocks = getStocks().filter(s => s.farmerId === farmerId);

   if (stocks.length === 0) {
      list.innerHTML = "<p>No stock added yet.</p>";
      return;
   }

   stocks.forEach(s => {
      list.innerHTML += `
         <div class="stock-card">
            <strong>${s.crop}</strong><br>
            Quantity: ${s.qty} ${s.unit}<br>
            Price: ₹${s.price} per ${s.unit}<br>
            Total Value: ₹${s.qty * s.price}<br>
            Status: ${s.status}<br><br>

            <button onclick="editStock('${s.id}')">Edit</button>
            <button onclick="deleteStock('${s.id}')">Delete</button>
            <button onclick="markSold('${s.id}')">Mark Sold</button>
         </div>
      `;
   });
}

function deleteStock(stockId) {

   let stocks = getStocks();

   stocks = stocks.filter(s => s.id !== stockId);

   localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));

   loadMyStock();
}

function markSold(stockId) {

   const stocks = getStocks();
   const stock = stocks.find(s => s.id === stockId);

   if (stock) stock.status = "sold";

   localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));

   loadMyStock();
}

function editStock(stockId) {

   const stocks = getStocks();
   const stock = stocks.find(s => s.id === stockId);

   if (!stock) return;

   const newQty = prompt("Enter new quantity:", stock.qty);
   const newPrice = prompt("Enter new price:", stock.price);

   if (newQty !== null) stock.qty = Number(newQty);
   if (newPrice !== null) stock.price = Number(newPrice);

   localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));

   loadMyStock();
}
// Filter stock for buyer
function filterStock() {

   const d = document.getElementById("buyer-district").value;
   const t = document.getElementById("buyer-taluk").value;
   const v = document.getElementById("buyer-village").value;
   const sortOption = document.getElementById("price-sort")?.value;

   // Filter only available stock
   let result = getStocks().filter(s =>
      s.status === "available" &&
      (!d || s.district === d) &&
      (!t || s.taluk === t) &&
      (!v || s.village === v)
   );

   // Sort by price
   if (sortOption === "low") {
      result.sort((a, b) => a.price - b.price);
   }

   if (sortOption === "high") {
      result.sort((a, b) => b.price - a.price);
   }

   const list = document.getElementById("buyer-stock-list");
   list.innerHTML = "";

   if (result.length === 0) {
      list.innerHTML = "<p>No stock available.</p>";
      return;
   }

   // Find cheapest price (for highlight)
   const minPrice = Math.min(...result.map(s => s.price));

   result.forEach(s => {

      const highlightStyle =
         s.price === minPrice ? "border:2px solid green;" : "";

      list.innerHTML += `
         <div class="stock-card" style="${highlightStyle}">
            <strong>${s.crop}</strong><br>
            Available: ${s.qty} ${s.unit}<br>
            Price: ₹${s.price} per ${s.unit}<br>
            Total Value: ₹${s.qty * s.price}<br>
            Farmer: ${s.name}<br>
            Location: ${s.village}, ${s.taluk}, ${s.district}
         </div>
      `;
   });
}

// Load district/taluk/village Dropdowns
function loadDistricts(mode = "farm") {
   const el = document.getElementById(mode === "buyer" ? "buyer-district" : "reg-district");
   el.innerHTML = `<option value="">Select</option>`;
   TNDATA.forEach(d => el.innerHTML += `<option value="${d.district}">${d.district}</option>`);
}


function loadTaluks(district, mode = "farm") {
   const talukEl = document.getElementById(mode === "buyer" ? "buyer-taluk" : "reg-taluk");
   talukEl.innerHTML = `<option value="">Select</option>`;

   const d = TNDATA.find(x => x.district === district);
   if (!d) return;

   d.taluks.forEach(tk => talukEl.innerHTML += `<option value="${tk.name}">${tk.name}</option>`);
}


function loadVillages(taluk, mode = "farm") {
   const vEl = document.getElementById(mode === "buyer" ? "buyer-village" : "reg-village");

   vEl.innerHTML = `<option value="">Select</option>`;

   for (let d of TNDATA) {
      const tk = d.taluks.find(x => x.name === taluk);
      if (tk) {
         tk.villages.forEach(v => vEl.innerHTML += `<option value="${v}">${v}</option>`);
         break;
      }
   }
}

