import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSeLUHYcwokBh1WfxAyCvEfLez3tz5VJ8",
  authDomain: "login-57413.firebaseapp.com",
  projectId: "login-57413",
  storageBucket: "login-57413.appspot.com",
  messagingSenderId: "107342732656",
  appId: "1:107342732656:web:70c6f5780b0f27a37a83b5",
  measurementId: "G-FG4EJRQKFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function showpass() {
  const passwordelement = document.getElementById("pass");
  const shhd = document.getElementById('shhd');
  if (passwordelement.type == 'password') {
    shhd.innerHTML = 'hide';
    passwordelement.type = 'text';
  } else {
    shhd.innerHTML = 'show';
    passwordelement.type = 'password';
  }
}

// Login function
async function login() {
  const email = document.getElementById("mail").value;
  const password = document.getElementById("pass").value;
  const error = document.getElementById("error");
  try {
    // Attempt to sign in the user
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to the protected page on successful login
    window.location.href = "random font/fonts.html";
  } catch (err) {
    error.textContent = err.message; // Display error message if login fails
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = 'random font/fonts.html'; // Redirect to the protected page if authenticated
  }
});

// Attach the function to the global window object
window.login = login;
window.showpass = showpass;