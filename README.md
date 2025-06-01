#  Browser-based Phishing Detection Assistant

This project is a browser extension that helps detect and warn users about potential phishing websites in real-time. The assistant analyzes the current website's URL and provides immediate feedback to the user via a popup interface.

##  Project Structure

- `popup.html` - The frontend HTML of the extension popup.
- `popup.js` - Contains logic to analyze the URL and display phishing warnings.
- `manifest.json` - Defines extension metadata, permissions, and script bindings.

##  Features

-  Analyzes the active browser tab's URL.
-  Displays "Phishing Website" if a suspicious pattern is detected.
-  Displays "Not a Phishing Website" for safe URLs.
-  Uses simple heuristics (like checking for '@', long domain lengths, etc.) to detect phishing signs.

##  How to Use

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (top right corner).
3. Click **Load unpacked**.
4. Select the folder where this project is located.
5. The extension will now be loaded and visible in the toolbar.