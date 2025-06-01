async function checkUrlWithVirusTotal(url) {
  const apiKey = '41a45a4bb47dabe2e6df20010c91bee526f077253d75b0677fcb8ad8f57836e1';

  const response = await fetch('https://www.virustotal.com/api/v3/urls', {
    method: 'POST',
    headers: {
      'x-apikey': apiKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `url=${encodeURIComponent(url)}`
  });

  const data = await response.json();

  const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${data.data.id}`;

  await new Promise(resolve => setTimeout(resolve, 3000));

  const analysisResponse = await fetch(analysisUrl, {
    headers: { 'x-apikey': apiKey }
  });

  const result = await analysisResponse.json();
  const maliciousCount = result.data.attributes.stats.malicious;

  return maliciousCount > 0 ? 'malicious' : 'safe';
}

document.getElementById('scanBtn').addEventListener('click', async () => {
  const url = document.getElementById('urlInput').value.trim();
  const resultBox = document.getElementById('result');

  if (!url) {
    resultBox.textContent = 'Please enter a URL.';
    resultBox.style.backgroundColor = '#fff3cd';
    return;
  }

  resultBox.textContent = ' Scanning...';
  resultBox.style.backgroundColor = '#e0e0e0';

  try {
    const result = await checkUrlWithVirusTotal(url);
    if (result === 'malicious') {
      resultBox.textContent = ' This site may be suspicious!';
      resultBox.style.backgroundColor = '#f8d7da';
    } else {
      resultBox.textContent = ' This site is safe.';
      resultBox.style.backgroundColor = '#d4edda';
    }
  } catch (err) {
    resultBox.textContent = ' Error checking the site.';
    resultBox.style.backgroundColor = '#fff3cd';
    console.error(err);
  }
});
