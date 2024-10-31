
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCTRQ7Jwg8ro4fGbNpRgY5Xri8KBUju_Cw",
    authDomain: "sonia-emporium-95984.firebaseapp.com",
    projectId: "sonia-emporium-95984",
    storageBucket: "sonia-emporium-95984.firebasestorage.app",
    messagingSenderId: "582010973914",
    appId: "1:582010973914:web:3bbcc21cef1d15a997ffe3",
    measurementId: "G-72TR5RZVBB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
