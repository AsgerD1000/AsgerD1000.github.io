import { auth } from './firebase.js';

// Function to fetch fonts from data.json
async function fetchFonts() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data.items.map(item => item.family);
  } catch (error) {
    console.error('Error loading fonts:', error);
    return [];
  }
}

// Function to apply random fonts to input text
window.applyRandomFont = async function () {
  const inputText = document.getElementById('text-input').value;
  const outputElement = document.getElementById('text-output');
  const fontelement = document.getElementById("current-font");

  if (!inputText.trim()) {
    alert('Please enter some text!');
    return;
  }

  // Clear previous content
  outputElement.innerHTML = '';

  const selectedFonts = [];

  // Fetch fonts
  const fonts = await fetchFonts();
  if (fonts.length === 0) {
    alert('No fonts available.');
    return;
  }

  // Apply a random font for each letter in the input text
  inputText.split('').forEach(letter => {
    let randomFont = "";
    if (letter != " ") {
      randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    }
    selectedFonts.push(randomFont);

    const span = document.createElement('span');
    span.textContent = letter;
    span.style.fontFamily = randomFont;
    span.className = 'letter';
    outputElement.appendChild(span);

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${randomFont.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });

  fontelement.innerHTML = "Fonts: " + selectedFonts.join(', ');
};

// Function to copy text with formatting
window.copy = function () {
  var spans = document.querySelectorAll('span');
  var copyText = Array.from(spans).map(span => {
    const fontFamily = window.getComputedStyle(span).fontFamily;
    const text = span.textContent;
    return `<span style="font-family: ${fontFamily};">${text}</span>`;
  }).join('');

  navigator.clipboard.write([
    new ClipboardItem({
      "text/html": new Blob([copyText], { type: "text/html" }),
      "text/plain": new Blob([Array.from(spans).map(span => span.textContent).join('')], { type: "text/plain" })
    })
  ]).then(() => {
    alert("Copied with formatting!");
  }).catch(err => {
    console.error("Failed to copy:", err);
  });
};

// Logout function
window.logout = function () {
  auth.signOut().then(() => {
    alert('Logged out successfully!');
    window.location.href = '../link.html'; // Redirect after logout
  }).catch((error) => {
    console.error('Error logging out:', error);
  });
};

// Check Firebase auth state and display login status
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('auth-status').textContent = `Logged in as: ${user.email}`;
    document.getElementById('logout-btn').style.display = 'inline';
  } else {
    window.location.href = '../link.html'; // Redirect to login page if not authenticated
  }
});