// firebase.js (Module)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Now we can safely use `auth` and `app` within this file or export them
export { auth };
