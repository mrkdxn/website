<?php

// check if there is a GET parameter called url and assign it to the variable $url
if (isset($_GET['url'])) {
    $url = $_GET['url'];
} else {
    // if there is no GET parameter called url, assign a default URL to the variable $url
    echo "No URL provided";
}

scrapeWebsites([$url], "//div[contains(@class, '--pb-xl')]");

function scrapeWebsites($urls, $selector) {
    // Results array to store scraped content
    $results = [];

    // Create a new DOM document
    $dom = new DOMDocument();

    // Limit the number of times the foreeach loop runs
    $limit = 100; // The maximum number of iterations
    $count = 0; // Counter to track iterations
    // Iterate through each URL
    foreach ($urls as $url) {

        // Break the loop if the limit is reached
        if ($count >= $limit) {
            break;
        }
        $count++;
        
        // Initialize cURL
        $ch = curl_init();

        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        // Execute cURL and get HTML content
        $html = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            $results[$url] = 'Error: ' . curl_error($ch);
            continue;
        }

        // Close cURL resource
        curl_close($ch);

        // Suppress warnings for malformed HTML
        @$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        // Create a DOMXPath object
        $xpath = new DOMXPath($dom);

        // Find elements matching the selector
        $elements = $xpath->query($selector);

        // Store extracted content
        if ($elements->length > 0 && $elements->length < 10) {
            $extractedContent = [];
            foreach ($elements as $element) {
                $extractedContent[] = trim($element->nodeValue);
            }
            $results[$url] = $extractedContent;
        } else {
            $results[$url] = 'Aucun élément correspondant n\'a été trouvé';
        }
    }
  
    foreach ($results as $key => $result)
    {
        if (gettype($result) == "array")
        {
            $textRaw = $result[0];
            $text = preg_replace('/Médiation culturelle\s*/', 'Médiation culturelle<br>', $textRaw);
        }
        else
        {
            $text = $result;
        }
        echo "<br>";
    	echo "<p>";
    	echo  $text;
		echo "</p>";
    }
}