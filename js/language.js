const LANG = {
   en: {
      app_title: "Uzhavar App",
      welcome: "Welcome",
      farmer_login: "Farmer Login",
      buyer_view: "Buyer View",
      market_price: "Market Price",
      weather_advisory: "Weather Advisory",
      paddy_guide: "Paddy Guide",
      schemes: "Schemes",
      register_farmer: "Register Farmer",
      add_stock: "Add Stock",
      my_stock: "My Stock",
      enter_mobile: "Enter Mobile Number",
      send_otp: "Send OTP",
      otp_verification: "OTP Verification",
      enter_otp: "Enter OTP",
      verify: "Verify",
      farmer_dashboard: "Farmer Dashboard",
      enter_name: "Farmer Name",
      enter_district: "District",
      enter_taluk: "Taluk",
      enter_village: "Village",
      select_crop: "Crop",
      enter_quantity: "Quantity",
      enter_unit: "Unit",
      save: "Save",
      filter_district: "District",
      filter_taluk: "Taluk",
      filter_village: "Village",
      search: "Search",
      crop: "Crop",
      price: "Price"
   },

   ta: {
      app_title: "உழவர் ஆப்",
      welcome: "வரவேற்பு",
      farmer_login: "விவசாயி நுழைவு",
      buyer_view: "கொள்முதல் பார்வை",
      market_price: "சந்தை விலை",
      weather_advisory: "வானிலை அறிவுரை",
      paddy_guide: "நெல் வழிகாட்டி",
      schemes: "திட்டங்கள்",
      register_farmer: "விவசாயி பதிவு",
      add_stock: "பொருள் சேர்",
      my_stock: "என் பொருள்",
      enter_mobile: "கைபேசி எண்",
      send_otp: "OTP அனுப்பு",
      otp_verification: "OTP சரிபார்ப்பு",
      enter_otp: "OTP உள்ளிடுக",
      verify: "சரிபார்க்க",
      farmer_dashboard: "விவசாயி பலகை",
      enter_name: "பெயர்",
      enter_district: "மாவட்டம்",
      enter_taluk: "வட்டம்",
      enter_village: "கிராமம்",
      select_crop: "பயிர்",
      enter_quantity: "அளவு",
      enter_unit: "அலகு",
      save: "சேமிக்க",
      filter_district: "மாவட்டம்",
      filter_taluk: "வட்டம்",
      filter_village: "கிராமம்",
      search: "தேடு",
      crop: "பயிர்",
      price: "விலை"
   }
};

let currentLang = localStorage.getItem("lang") || "en";
function applyLanguage() {
   document.querySelectorAll("[data-lang]").forEach(el => {
      const key = el.getAttribute("data-lang");
      if (LANG[currentLang] && LANG[currentLang][key]) {
         el.textContent = LANG[currentLang][key];
      }
   });
}

function setLanguage(lang) {
   currentLang = lang;
   localStorage.setItem("lang", lang);
   applyLanguage();
}

document.addEventListener("DOMContentLoaded", applyLanguage);
