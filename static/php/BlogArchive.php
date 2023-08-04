<?php



class BlogArchive
{
	private $photoset;

	function __construct() {
        $this->getJSON();
    }

    private function getJSON()
    {
    	$jsonFile = __DIR__ . '/inc/blog-archive.json';
        
        $jsonDecoded = json_decode(file_get_contents($jsonFile));
    	//var_dump(json_decode(file_get_contents($jsonFile)));
    	$this->parseJSON($jsonDecoded);
    }
    private function parseJSON($json)
    {

    	foreach ($json as $item)
    	{
            echo "<div class='post'>";
            echo "<h3>" . $item->title . "</h3>";
            echo "<p>"  . explode('T', $item->date)[0] . "</p><p>" . $item->content . "</p>";
            echo "</div>";
            
    	}
    }



    
    private function getImages($json)
    {
        $sum = 0;
        foreach ($json as $item)
        {
            $content = $item->content;
            
            
            if (preg_match_all('~<img.*?src=["\']+(.*?)["\']+~', $content, $urls))
            {
                preg_match_all('~<img.*?src=["\']+(.*?)["\']+~', $content, $urls);
                $urls = $urls[1];

                if (strpos($urls[0], '.jpg') !== false) {
                  
                   // echo $urls[0] . "<br>";

                    echo "<table border=1><tr>";
                    echo "<td><img width=70px height=50px src='" . $urls[0] . "' /></td>";
                    echo "<td>" . $urls[0]. "</td>";
                    echo "</tr></table>";
              
            }

            }

        }
    }
  
}

$blog= new BlogArchive();