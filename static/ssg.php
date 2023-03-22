<?php

require 'vendor/autoload.php';
require 'php/Flickr.php';

use Philo\Blade\Blade;

class SSG 
{
	
	public function init()
	{
		date_default_timezone_set("America/New_York");

		echo '========================================'. PHP_EOL;
		echo 'Building static site...'. PHP_EOL;
		$contentDir = __DIR__ . '/content';
		$contentFiles = array_diff(scandir($contentDir), array('.', '..'));
		
		foreach ($contentFiles as $file) {
			//var_dump($file);
			if ($file != '.DS_Store')
			{
				$data = json_decode(file_get_contents($contentDir . '/' . $file));
				$blade = new Blade(__DIR__ . '/resources/views', __DIR__ . '/cache');

				$theView = $data->view ;
				$content = $blade->view()
				->make($theView, get_object_vars($data))
				->render();

				$outputDir = dirname(__DIR__, 1) . '/docs' . $data->slug;
				if(!is_dir($outputDir))
					{
						mkdir($outputDir, 0755, true);
					}
				$outputPath = $outputDir . '/index.html';
				file_put_contents($outputPath, $content);

				echo 'Built page: ' . $outputPath . PHP_EOL;
			}
			
		}
		echo date("h:i:sa") . PHP_EOL;
		echo 'DONE.'. PHP_EOL;
		echo '========================================'. PHP_EOL;
	}

}

$ssg = new SSG;
$ssg->init();