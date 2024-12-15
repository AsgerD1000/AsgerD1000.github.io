// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; // Use the same version for consistency

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSeLUHYcwokBh1WfxAyCvEfLez3tz5VJ8",
  authDomain: "login-57413.firebaseapp.com",
  projectId: "login-57413",
  storageBucket: "login-57413.appspot.com", // Fixed the storageBucket URL
  messagingSenderId: "107342732656",
  appId: "1:107342732656:web:70c6f5780b0f27a37a83b5",
  measurementId: "G-FG4EJRQKFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize the Firebase app
const analytics = getAnalytics(app); // Initialize Analytics
const auth = getAuth(app); // Pass the app instance to getAuth()

// Login function
async function login() {
  const email = document.getElementById("mail").value;
  const password = document.getElementById("pass").value;
  const error = document.getElementById("error");

  try {
    // Attempt to sign in the user
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to the protected page on successful login
    window.location.href = "protected.html";
  } catch (err) {
    error.textContent = err.message; // Display error message if login fails
  }
}

// Attach the function to the global window object
window.login = login;