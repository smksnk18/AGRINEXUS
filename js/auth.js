let OTP = "";
let loggedIn = false;
let otpTime = null;
let attempts = 0;

function sendOTP() {
   const mobile = document.getElementById("farmer-mobile").value;

   if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
   }
   OTP = Math.floor(100000 + Math.random() * 900000).toString();
   otpTime = Date.now();
   attempts = 0;

   alert("OTP Sent: " + OTP); 
   openScreen("screen-otp");
}

function verifyOTP() {
   const input = document.getElementById("otp-input").value;

   if (Date.now() - otpTime > 120000) {
      alert("OTP expired. Please request a new one.");
      return;
   }

   if (attempts >= 3) {
      alert("Too many attempts. Request a new OTP.");
      return;
   }

   if (input === OTP) {
      loggedIn = true;
      localStorage.setItem("session", "farmer");
      alert("Login Successful");
      openScreen("screen-farmer-dashboard");
   } else {
      attempts++;

      let remaining = 3 - attempts;

      if (remaining > 0) {
         alert(`Invalid OTP. Attempts left: ${remaining}`);
      } else {
         alert("Too many attempts. Request a new OTP.");
      }
   }
}


document.addEventListener("DOMContentLoaded", () => {
   const session = localStorage.getItem("session");

   if (session === "farmer") {
      loggedIn = true;
      openScreen("screen-farmer-dashboard");
   }
});

function logoutFarmer() {
   loggedIn = false;
   localStorage.removeItem("session");
   alert("Logged Out");
   openScreen("screen-home");
}
