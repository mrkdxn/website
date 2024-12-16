async function fetchSitemapToArray(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch sitemap: ${response.statusText}`);
        }
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) {
            throw new Error("Error parsing XML: " + parseError.textContent);
        }
        const locElements = xmlDoc.querySelectorAll("url > loc");
        return Array.from(locElements).map(el => el.textContent);
    } catch (error) {
        console.error("Error processing sitemap:", error);
        return [];
    }
}

async function scrapeUrl(endpoint, url) {
    try {
        const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error(`Failed to scrape URL: ${response.statusText}`);
        }
        const data = await response.text(); // Assuming the endpoint returns plain text
        return data;
    } catch (error) {
        console.error(`Error scraping URL ${url}:`, error);
        return `Error scraping ${url}`;
    }
}

document.getElementById('fetch-sitemap').addEventListener('click', async () => {
    const sitemapUrl = 'https://ntni.banq.qc.ca/cultural-item-sitemap.xml'; // Replace with your sitemap URL
    const scrapeEndpoint = 'scrape-url.php'; // Replace with your scrape endpoint
    const sitemapList = document.getElementById('sitemap-list');
    const sitemapTitle = document.getElementById('sitemapURL');

    // Clear any existing content
    sitemapTitle.innerHTML = `<h3>Récupération du plan du site >>> ${sitemapUrl}</h3>`;

    const urls = await fetchSitemapToArray(sitemapUrl);

    if (urls.length === 0) {
        sitemapList.innerHTML = '<li>No URLs found in sitemap.</li>';
        return;
    }

    sitemapList.innerHTML = ''; // Clear the placeholder text

    // Process each URL, limit to 20
    const urlLimitSelect = document.getElementById('url-limit');
    const urlLimit = parseInt(urlLimitSelect.value);
    if (isNaN(urlLimit) || urlLimit <= 0) {
        alert('Select a limit to proceed');
        return;
    }
    const limitedUrls = urls.slice(0, urlLimit); // Take only the first 20 URLs

for (const url of limitedUrls) {
    const li = document.createElement('li');
    li.textContent = `Scraping ${url}`;
    sitemapList.appendChild(li);

    // Wait for 1000 ms before scraping
    await new Promise(resolve => setTimeout(resolve, 1000));

    const scrapeResult = await scrapeUrl(scrapeEndpoint, url); // Scrape the URL
    li.innerHTML = `<span style="color:green">Done:</span> <a href="${url}">${url}</a> : ${scrapeResult}`; // Update list item with result
}

});
