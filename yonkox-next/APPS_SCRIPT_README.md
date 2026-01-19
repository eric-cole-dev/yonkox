# Google Apps Script Setup for Reservation Form

To make the reservation form work, you need to create a simple backend using Google Sheets and Google Apps Script. This will allow the form data to be saved directly into a spreadsheet.

## Steps

1.  **Create a Google Sheet:**
    *   Go to `sheets.google.com` and create a new sheet.
    *   Name it something like "YonkoX Reservations".
    *   In the first row, add the headers: `Timestamp`, `Name`, `Email`, `Phone`, `Instagram`, `Event`.

2.  **Open Apps Script:**
    *   In the Google Sheet, go to **Extensions** > **Apps Script**.

3.  **Paste the Code:**
    *   Delete any code in the `Code.gs` file and paste the following code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the JSON data sent from the website
  var data = JSON.parse(e.postData.contents);
  
  // Get the current date and time
  var timestamp = new Date();
  
  // Append the data to the sheet
  sheet.appendRow([
    timestamp,
    data.name,
    data.email,
    data.phone,
    data.instagram,
    data.event
  ]);
  
  // Return a success response
  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Setup CORS to allow requests from your website
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```

4.  **Deploy as Web App:**
    *   Click the blue **Deploy** button > **New deployment**.
    *   Click the **Select type** gear icon > **Web app**.
    *   **Description:** "Reservation API".
    *   **Execute as:** "Me" (your email).
    *   **Who has access:** **Anyone** (This is crucial so your website can talk to it).
    *   Click **Deploy**.

5.  **Copy the URL:**
    *   Copy the "Web app URL" provided (it looks like `https://script.google.com/macros/s/.../exec`).

6.  **Update the Code:**
    *   Open `yonkox-next/components/ReservationModal.tsx`.
    *   Find the line: `const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";`
    *   Replace `"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"` with the URL you just copied.

## Important Note on CORS
Google Apps Script simple triggers (like `doPost`) can be tricky with CORS (Cross-Origin Resource Sharing). 
The provided React code uses `mode: "no-cors"` which allows the request to reach Google, but the browser won't be able to read the response (so it won't know for sure if it succeeded, but the data will be saved).

This is why we set `setStatus("success")` optimistically in the code or use a delay. For a production app, you might want to set up a Next.js API route as a proxy, but this "no-cors" method is the simplest way to get started without backend infrastructure.
