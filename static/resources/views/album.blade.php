@include('inc/header')

	<h1>{{ $h1 }}</h1>
	
	
<div class="gallery" id="photos">
	<div id="album_container"></div>
     <?php 
	$photos = $photoset;
	$album= new Flickr($photos);
	?>
</div>

<script>
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>

@include('inc/footer')