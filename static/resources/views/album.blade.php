@include('inc/header')

	<h2>{{ $h1 }}</h2>
	
	
<div class="gallery" id="photos">
     <?php 
	$photos = $photoset;
	$album= new Flickr($photos);
	?>
</div>

<script>
	var lightbox = new SimpleLightbox('.photo a', {  });
    //lazyLoadInstance.update();

    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>

@include('inc/footer')