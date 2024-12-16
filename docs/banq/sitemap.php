<?php
function extractUrlsFromSitemap($sitemapUrl) {
    // Initialize cURL with robust settings
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $sitemapUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    // Execute and handle potential errors
    $sitemapContent = curl_exec($ch);
    
    if (curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
        return [];
    }
    
    curl_close($ch);

    // Use libxml to suppress warnings and handle XML parsing
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($sitemapContent);
    
    // Check for XML parsing errors
    if ($xml === false) {
        echo "XML Parsing Errors:\n";
        foreach(libxml_get_errors() as $error) {
            echo $error->message . "\n";
        }
        libxml_clear_errors();
        return [];
    }

    // Extract URLs, handling potential namespace issues
    $urls = [];
    $namespaces = $xml->getNamespaces(true);
    
    // Try multiple XPath queries to catch different sitemap formats
    $xpathQueries = [
        '//loc',
        '//sitemap:loc',
        '//*[local-name()="loc"]'
    ];

    foreach ($xpathQueries as $query) {
        $elements = $xml->xpath($query);
        if (!empty($elements)) {
            foreach ($elements as $loc) {
                $urls[] = trim((string)$loc);
            }
            break;
        }
    }

    return $urls;
}

// Example usage with multiple sitemaps
$sitemapUrls = [
    'https://ntni.banq.qc.ca/cultural-item-sitemap.xml'
];

$allUrls = [];
foreach ($sitemapUrls as $sitemapUrl) {
    var_dump($sitemapUrl);
    // $siteUrls = extractUrlsFromSitemap($sitemapUrl);
    // $allUrls = array_merge($allUrls, $siteUrls);
}

// Remove duplicates if needed
$uniqueUrls = array_unique($allUrls);

// Print the array of URLs
var_dump($uniqueUrls);