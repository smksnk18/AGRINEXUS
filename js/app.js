const crops = [
   "https://upload.wikimedia.org/wikipedia/commons/7/7b/Rice_Paddy.jpg",
   "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomatoes.jpg",
   "https://upload.wikimedia.org/wikipedia/commons/2/2f/Onion_on_White.JPG",
   "https://upload.wikimedia.org/wikipedia/commons/f/f2/Red_chili.jpg"
];

function loadCropGallery(){

   const container = document.getElementById("crop-gallery");

   if(!container) return;

   container.innerHTML = "";

   // ⭐ FOR EACH LOOP
   crops.forEach(img => {

      container.innerHTML += `
         <img src="${img}" style="
         width:100%;
         height:90px;
         object-fit:cover;
         border-radius:10px;
         box-shadow:0 4px 8px rgba(0,0,0,.2);
         ">
      `;
   });

}

// Screen Navigation
function openScreen(id) {

   // Hide all screens
   document.querySelectorAll(".screen").forEach(s => {
      s.classList.add("hidden");
   });

   // Show selected screen
   const screen = document.getElementById(id);
   if (screen) screen.classList.remove("hidden");

   // Load dynamic data
   if (id === "screen-my-stock") loadMyStock();
   if (id === "screen-market") renderMarketPrices();
   if (id === "screen-weather") renderWeather();
   if (id === "screen-schemes") renderSchemes();
   if (id === "screen-paddy-guide") renderPaddyGuide();
   if (id === "screen-buyer-view") loadDistricts("buyer");
   if (id === "screen-farmer-register") loadDistricts("farm");
}
// Render Market Prices
function renderMarketPrices() {

   const tbody = document.getElementById("market-price-table");
   tbody.innerHTML = "";

   const stocks = getStocks();

   // Demand ranking calculation
   const demandCount = {};
   stocks.forEach(s => {
      if (s.status === "available") {
         demandCount[s.crop] = (demandCount[s.crop] || 0) + 1;
      }
   });

   MARKET_PRICES.forEach(item => {

      const cropStocks = stocks.filter(s =>
         s.crop === item.crop && s.status === "available"
      );

      let lowest = null;
      let highest = null;
      let percentDiff = 0;
      let trend = "";
      let badge = "";
      let barWidth = 0;

      if (cropStocks.length > 0) {

         lowest = Math.min(...cropStocks.map(s => s.price));
         highest = Math.max(...cropStocks.map(s => s.price));

         percentDiff = (((lowest - item.price) / item.price) * 100).toFixed(1);

         if (lowest < item.price) {
            trend = "↓";
            badge = "<span style='color:green;'>Below Market</span>";
         } else if (lowest > item.price) {
            trend = "↑";
            badge = "<span style='color:red;'>Above Market</span>";
         } else {
            trend = "→";
            badge = "<span style='color:orange;'>Equal</span>";
         }

         // bar width (visual indicator)
         barWidth = Math.min(Math.abs(percentDiff) * 3, 100);
      }

      const demand = demandCount[item.crop] || 0;

      tbody.innerHTML += `
         <tr>
            <td>
               <strong>${item.crop}</strong><br>
               Market Avg: ₹${item.price}
            </td>
            <td>
               Listings: ${cropStocks.length}<br>
               Demand Level: ${demand}<br>
               ${lowest !== null ? `Lowest: ₹${lowest} (${percentDiff}% ${trend})<br>` : "No Listings<br>"}
               ${highest !== null ? `Highest: ₹${highest}<br>` : ""}
               ${badge}
               <div style="
                  height:8px;
                  background:#ddd;
                  margin-top:6px;
                  width:100%;
               ">
                  <div style="
                     height:8px;
                     width:${barWidth}%;
                     background:${percentDiff < 0 ? 'green' : 'red'};
                  "></div>
               </div>
            </td>
         </tr>
      `;
   });
}
// Render Weather Advisory
function renderWeather() {
   const box = document.getElementById("weather-content");
   box.innerHTML = "";
   WEATHER_ADVISORY.forEach(w => {
      box.innerHTML += `
         <div class="paddy-card">
            <strong>${w.crop}</strong><br>
            Best Season: ${w.best_season}<br><br>
            ${w.notes}
         </div>
      `;
   });
}

// Render Schemes
function renderSchemes() {
   const list = document.getElementById("scheme-list");
   list.innerHTML = "";
   SCHEMES.forEach(s => {
      list.innerHTML += `
         <div class="scheme-card">
            <strong>${s.name}</strong><br>
            Type: ${s.type}<br>
            Benefit: ${s.benefit}<br>
            Eligibility: ${s.eligibility}<br>
            Link: <span style="color:blue">${s.link}</span>
         </div>
      `;
   });
}
// Render Paddy Varieties
function renderPaddyGuide() {
   const box = document.getElementById("paddy-varieties");
   box.innerHTML = "";
   PADDY_VARIETIES.forEach(group => {
      box.innerHTML += `
         <div class="paddy-card">
            <strong>${group.state}</strong><br><br>
            ${group.varieties.map(v => `
               <div style="margin-bottom:6px;">
                  <strong>${v.name}</strong><br>
                  Duration: ${v.duration}<br>
                  Type: ${v.type}<br>
                  Suitable: ${v.suitable}
               </div>
            `).join("")}
         </div>
      `;
   });
}

// Auto Initialization on Load
document.addEventListener("DOMContentLoaded", () => {
   applyLanguage();
   loadDistricts("farm");

   const session = localStorage.getItem("session");

   if (session === "farmer") {
      openScreen("screen-farmer-dashboard");
   } else {
      openScreen("screen-home");
   }
});


document.addEventListener("DOMContentLoaded", () => {
   applyLanguage();
   loadDistricts("farm");
   const session = localStorage.getItem("session");
   if (session === "farmer") {
      openScreen("screen-farmer-dashboard");
   } else {
      openScreen("screen-home");
   }
});
document.addEventListener("DOMContentLoaded", () => {

   // show home screen first
   openScreen("screen-home");

   // load images using loop
   loadCropGallery();

   // apply saved language
   setTimeout(applyLanguage,50);

});

const cottonData = [
   {
      img: "img/cotton1.jpg",
      fact: "Cotton grows best in black soil with warm climate and moderate rainfall."
   },
   {
      img: "img/cotton2.jpg",
      fact: "Cotton is a Kharif crop and requires 6–8 months for complete cultivation."
   },
   {
      img: "img/cotton3.jpg",
      fact: "India is one of the largest producers of cotton in the world."
   }
];

let cottonIndex = 0;

// Looping using FOR loop
function startCottonLoop() {
   const imgEl = document.getElementById("cotton-image");
   const factEl = document.getElementById("cotton-fact");

   for (let i = 0; i < cottonData.length; i++) {
      setTimeout(() => {
         imgEl.src = cottonData[i].img;
         factEl.textContent = cottonData[i].fact;
      }, i * 3000);
   }

   // Repeat loop
   setTimeout(startCottonLoop, cottonData.length * 3000);
}

// Start loop when page loads
document.addEventListener("DOMContentLoaded", startCottonLoop);

function generateEGQR() {

   const mfd = document.getElementById("eg-mfd").value;
   const exp = document.getElementById("eg-exp").value;
   const batch = document.getElementById("eg-batch").value;
   const brand = document.getElementById("eg-brand").value;
   const ingredients = document.getElementById("eg-ingredients").value;

   if (!mfd || !exp || !batch || !brand || !ingredients) {
      alert("Please fill all fields");
      return;
   }

   const egString = `EG1|${mfd}|${exp}|${batch}|${brand}|${ingredients}`;

   document.getElementById("eg-output").textContent = egString;

   const qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
      encodeURIComponent(egString);

   document.getElementById("eg-qr").src = qrURL;
}

function parseEG1() {

   const input = document.getElementById("eg-input").value.trim();

   if (!input.startsWith("EG1|")) {
      alert("Invalid EG1 format");
      return;
   }

   const parts = input.split("|");

   const mfd = parts[1];
   const exp = parts[2];
   const batch = parts[3];
   const brand = parts[4];
   const ingredientString = parts[5];

   const ingredients = ingredientString.split(",");

   let decodedHTML = `
      <strong>Brand:</strong> ${brand}<br>
      <strong>Batch:</strong> ${batch}<br>
      <strong>MFD:</strong> ${mfd}<br>
      <strong>EXP:</strong> ${exp}<br><br>
      <strong>Ingredients:</strong><br>
   `;

   let sugar = 0;
   let salt = 0;
   let fat = 0;

   ingredients.forEach(item => {

      const [name, qty] = item.split(":");
      decodedHTML += `${name} - ${qty}<br>`;

      const grams = parseFloat(qty);

      if (name.toLowerCase().includes("sugar"))
         sugar = grams;

      if (name.toLowerCase().includes("salt"))
         salt = grams;

      if (name.toLowerCase().includes("palm") || name.toLowerCase().includes("fat"))
         fat = grams;

   });

   document.getElementById("eg-decoded").innerHTML = decodedHTML;

   runHealthEngine(sugar, salt, fat, exp);
}

function runHealthEngine(sugar, salt, fat, expDate) {

   let healthHTML = "";

   const today = new Date();
   const exp = new Date(expDate);

   if (today > exp) {
      healthHTML += "<p style='color:red;'>⚠ Product Expired!</p>";
   }

   if (sugar > 0) {
      const safe = Math.floor(25 / sugar);
      healthHTML += `<p>Sugar per serving: ${sugar}g</p>`;
      healthHTML += `<p>Safe servings per day: ${safe}</p>`;

      if (safe <= 1)
         healthHTML += "<p style='color:red;'>High Sugar Risk</p>";
   }

   if (salt > 0) {
      const safe = Math.floor(5 / salt);
      healthHTML += `<p>Salt per serving: ${salt}g</p>`;
      healthHTML += `<p>Safe servings per day: ${safe}</p>`;

      if (safe <= 1)
         healthHTML += "<p style='color:red;'>High Sodium Risk</p>";
   }

   if (fat > 0) {
      const safe = Math.floor(20 / fat);
      healthHTML += `<p>Fat per serving: ${fat}g</p>`;
      healthHTML += `<p>Safe servings per day: ${safe}</p>`;
   }

   document.getElementById("eg-health").innerHTML = healthHTML;
}
let html5QrCode;

function startScanner() {

   const qrRegionId = "qr-reader";

   html5QrCode = new Html5Qrcode(qrRegionId);

   const config = { fps: 10, qrbox: 250 };

   Html5Qrcode.getCameras().then(devices => {

      if (devices && devices.length) {

         const cameraId = devices[0].id;

         html5QrCode.start(
            cameraId,
            config,
            qrCodeMessage => {

               // Stop scanner after successful scan
               html5QrCode.stop();

               document.getElementById("eg-input").textContent = qrCodeMessage;

               parseScannedEG1(qrCodeMessage);

            },
            errorMessage => {
               // ignore scan errors
            }
         );
      }
   }).catch(err => {
      alert("Camera access denied or not available.");
   });
}

function stopScanner() {
   if (html5QrCode) {
      html5QrCode.stop().catch(err => console.log(err));
   }
}

function parseScannedEG1(input) {

   if (!input.startsWith("EG1|")) {
      alert("Invalid EG1 format");
      return;
   }

   const parts = input.split("|");

   const mfd = parts[1];
   const exp = parts[2];
   const batch = parts[3];
   const brand = parts[4];
   const ingredientString = parts[5];

   const ingredients = ingredientString.split(",");

   let decodedHTML = `
      <strong>Brand:</strong> ${brand}<br>
      <strong>Batch:</strong> ${batch}<br>
      <strong>MFD:</strong> ${mfd}<br>
      <strong>EXP:</strong> ${exp}<br><br>
      <strong>Ingredients:</strong><br>
   `;

   let sugar = 0;
   let salt = 0;
   let fat = 0;

   ingredients.forEach(item => {

      const [name, qty] = item.split(":");
      decodedHTML += `${name} - ${qty}<br>`;

      const grams = parseFloat(qty);

      if (name.toLowerCase().includes("sugar"))
         sugar = grams;

      if (name.toLowerCase().includes("salt"))
         salt = grams;

      if (name.toLowerCase().includes("palm") || name.toLowerCase().includes("fat"))
         fat = grams;

   });

   document.getElementById("eg-decoded").innerHTML = decodedHTML;

   runHealthEngine(sugar, salt, fat, exp);
}
function detectLocationAndFetchWeather() {

   if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
   }

   navigator.geolocation.getCurrentPosition(async position => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      await getWeatherByCoords(lat, lon);

   }, error => {
      alert("Location access denied");
   });
}