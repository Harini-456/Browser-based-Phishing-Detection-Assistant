(async function () {
  const apiKey = "41a45a4bb47dabe2e6df20010c91bee526f077253d75b0677fcb8ad8f57836e1";
  const url = window.location.href;

  try {
    const response = await fetch(`https://www.virustotal.com/api/v3/urls`, {
      method: 'POST',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(url)}`
    });

    const data = await response.json();
    const analysisId = data.data.id;

    let result;
    let attempts = 0;
    let maxAttempts = 5;

    while (attempts < maxAttempts) {
      const report = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        headers: { 'x-apikey': apiKey }
      });

      result = await report.json();

      if (result.data.attributes.status === "completed") {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 3000)); 
      attempts++;
    }

    const threats = result.data.attributes.stats.malicious;

    if (threats > 0) {
      alert("⚠️ Warning: This page is flagged as suspicious!");
    } else {
      console.log("Page is safe.");
    }

  } catch (err) {
    console.error("Error checking page:", err);
  }
})();
