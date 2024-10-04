<?php

// This class uses the current token saved in the file /static/keys/instagram.txt to refresh the token and then saves it back to the file
// This will be used for q cron job to refresh the token every week
// Example of the endpoint: https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={token}

class InstaToken {

    public function __construct() {
        $this->refreshToken();
    }
    // create a method to refresh the token
    public function refreshToken() {
        // get the token from the file in the static/keys directory
        $file = '../keys/instagram.txt';
        $insta = file_get_contents($file);
        // create the endpoint
        $url = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=".$insta;
        // create the curl request
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // execute the curl request
        $result = curl_exec($curl);
        var_dump($result);
        // decode the result
        $result = json_decode($result);
        // get the new token
        $newToken = $result->access_token;
        // write the new token to the file
        file_put_contents($file, $newToken);
        // close the curl request
        curl_close($curl);
    }
}
new InstaToken();