<?php
include_once('keys/keys.php');

class Flickr
{
	private $photoset;
    private $key = FLICKR;

	function __construct($init_parameter) {
        $this->photoset = $init_parameter;
        $this->flickrAPI();
    }

    private function flickrAPI()
    {

    	$url = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='. $this->key. '&photoset_id=' . $this->photoset . '&user_id=80995589%40N00&extras=tags,description&format=json&nojsoncallback=1';
    	
    	$curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);
        $result = json_decode($result);
        $this->parseJSON($result);

        curl_close($curl);
    }
    private function parseJSON($json)
    {
    	$photos = $json->photoset->photo;

    	foreach($photos as $photo)
    	{
    		
    		$photoURL = 'https://live.staticflickr.com/' . $photo->server . '/' . $photo->id . '_' . $photo->secret;
    		$photoTitle = $photo->title;
    		$this->printPhotos($photoURL, $photoTitle);
    	}
    	
    }
    private function printPhotos($url, $title)
    {
    	echo '<div class="photo"><img title="' . $title . '" class="lazy" data-src="' . $url . '_m.jpg">';
    	echo '<div class="overlayDiv"><a href="' . $url . '_b.jpg" title="' . $title . '">';
    	echo '<div class="overlayText"><h3>' . $title . '</h3></div></a></div></div>';

    	//thePhoto = 'https://live.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret;

    }
}

