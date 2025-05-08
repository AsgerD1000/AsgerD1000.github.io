import { auth } from './firebase.js';

var aspect_ratio = window.innerWidth / window.innerHeight
if (Math.abs(aspect_ratio - (16 / 9)) >= 0.5) {
  alert('You are not using the optimized aspect ratio. If the sites ugly deal make a pull request: https://github.com/AsgerD1000/AsgerD1000.github.io/pulls')
}


// Function to fetch fonts from data.json
async function fetchFonts(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return [];
  }
}

let selectedFonts = []; // Define selectedFonts as a global variable

// Function to apply random fonts to input text
window.applyRandomFont = async function () {
  selectedFonts = [];
  const inputText = document.getElementById('text-input').value;
  const outputElement = document.getElementById('text-output');
  const fontelement = document.getElementById("current-font");
  const MS = document.getElementById("MS");

  if (!inputText.trim()) {
    alert('Please enter some text!');
    return;
  }

  // Clear previous content
  outputElement.innerHTML = '';
  let fonts
  // Fetch fonts
  if (MS.checked) {
  fonts = await fetchFonts('microsoft-fonts.json');
  }
  else {
  fonts = await fetchFonts('google-fonts.json');
  }
  if (fonts.length === 0) {
    alert('No fonts available.');
    return;
  }

  // Apply a random font for each letter in the input text
  inputText.split('').forEach((letter, index) => {
    let randomFont = "";
    randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    selectedFonts.push(randomFont);
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.fontFamily = randomFont;
    span.classList.add("letter");
    span.addEventListener("mousedown", ()=> {
      if (fontelement.innerHTML.length >= index) {
        if (selectedFonts[index].includes('<strong>') == false) {
          selectedFonts[index] = "<strong>" + selectedFonts[index] + "</strong>"
          span.classList.add("selected")
        }
        else {
          selectedFonts[index] = selectedFonts[index].replaceAll("<strong>", "").replaceAll("</strong>", "")
          span.classList.remove("selected")
        }
        fontelement.innerHTML = "Fonts: " + selectedFonts.join(', ');
      }
      
    })
    outputElement.appendChild(span);

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${randomFont.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });

  fontelement.innerHTML = "Fonts: " + selectedFonts.join(', ');
};

window.download = async function downloadFonts(...args) {
  const fonts = args.length ? args : selectedFonts.map(font => ({
    name: font,
    url: `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`
  }));

  const zip = new JSZip();

  for (const font of fonts) {
    try {
      // Fetch the CSS file
      const response = await fetch(font.url);
      const cssText = await response.text();

      // Extract the font file URL from the CSS
      const fontFileUrl = cssText.match(/url\((https:\/\/fonts.gstatic.com\/.*?\.woff2)\)/)[1];

      // Fetch the font file
      const fontResponse = await fetch(fontFileUrl);
      const fontBlob = await fontResponse.blob();

      // Add the WOFF2 file to the ZIP
      zip.file(`${font.name}.woff2`, fontBlob);
    } catch (error) {
      console.error(`Error downloading the font ${font.name}:`, error);
    }
  }

  // Generate the ZIP file and trigger the download
  try {
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'fonts.zip';
    link.click();
  } catch (error) {
    console.error('Error generating the ZIP file:', error);
  }
}

// Function to copy text with formatting
window.copy = function () {
  const spans = document.querySelectorAll('span');
  const copyText = Array.from(spans).map(span => {
    // Get the computed font family
    let fontFamily = window.getComputedStyle(span).fontFamily;

    // Extract only the primary font and clean it up
    fontFamily = fontFamily.split(',')[0].replace(/["']/g, '').trim();

    // Wrap it in single quotes if it's more than one word
    if (fontFamily.includes(' ')) {
      fontFamily = `'${fontFamily}'`;
    }

    const text = span.textContent;
    return `<span style="font-family: ${fontFamily};">${text}</span>`;
  }).join('');

  navigator.clipboard.write([
    new ClipboardItem({
      "text/html": new Blob([copyText], { type: "text/html" }),
      "text/plain": new Blob([Array.from(spans).map(span => span.textContent).join('')], { type: "text/plain" })
    })
  ]).then(() => {
    alert("Copied!");
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